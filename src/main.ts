import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { mkdirSync, existsSync } from 'fs';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import AdminJS from 'adminjs';
import { buildAuthenticatedRouter } from '@adminjs/express';

import { AppModule } from './app.module.js';
import { getAdminOptions } from './admin/options.js';
import provider from './admin/auth-provider.js';
import { getImprovedSessionConfig } from './config/session.config.js';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Connect cookie-parser with secret for signed cookies (required for cookie-session)
  app.use(cookieParser(process.env.COOKIE_SECRET || 'fallback-secret-for-development'));

  // Create sessions directory if it doesn't exist
  if (process.env.NODE_ENV === 'production') {
    const sessionsPath = process.env.ROOT_FOLDER ? `${process.env.ROOT_FOLDER}/sessions` : './sessions';
    if (!existsSync(sessionsPath)) {
      try {
        mkdirSync(sessionsPath, { recursive: true });
      } catch (error) {
        console.warn('⚠️ Could not create sessions directory:', error.message);
      }
    }
  }

  // Configure session middleware explicitly
  const sessionConfig = getImprovedSessionConfig();
  app.use(session(sessionConfig));

  // 🛡️ Security Headers Middleware
  app.use((req, res, next) => {
    // Prevent clickjacking
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');

    // Prevent MIME type sniffing
    res.setHeader('X-Content-Type-Options', 'nosniff');

    // Enable XSS protection
    res.setHeader('X-XSS-Protection', '1; mode=block');

    // Referrer policy for privacy
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');

    // Content Security Policy (basic)
    res.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';");

    next();
  });

  // Serve static files from public directory
  app.useStaticAssets(join(process.cwd(), 'public'), {
    prefix: process.env.NODE_ENV === 'production' ? process.env.ROOT_FOLDER + '/public/' : '/public/',
  });

  // 🔧 Manual AdminJS Setup
  try {
    const adminOptions = await getAdminOptions();
    const admin = new AdminJS({
      ...adminOptions,
      rootPath: '/admin',
    });

    // Build authentication router using @adminjs/express
    // Pass null as sessionOptions since we've already configured session middleware
    const adminRouter = buildAuthenticatedRouter(
      admin,
      {
        provider,
        cookiePassword: process.env.COOKIE_SECRET || 'fallback-secret-for-development',
        cookieName: 'adminjs',
      },
      null,
      null // Don't let AdminJS configure its own session
    );

    // Mount admin router
    app.use('/admin', adminRouter);
  } catch (error) {
    console.error('❌ Failed to setup AdminJS:', error.message);
  }

  // 🔒 SECURE CORS Configuration
  const allowedOrigins = process.env.NODE_ENV === 'production'
    ? [
      process.env.FRONTEND_URL,
      process.env.BACKEND_URL,
      process.env.ADMIN_PANEL_URL,
    ].filter(Boolean)
    : [
      process.env.FRONTEND_URL,
      process.env.BACKEND_URL,
      process.env.ADMIN_PANEL_URL,
    ].filter(Boolean);

  app.enableCors({
    origin: allowedOrigins.length > 0 ? allowedOrigins : true, // Fallback to true if no origins configured
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'Cookie',
      'X-Requested-With',
      'Accept',
      'X-CSRF-Token'
    ],
    exposedHeaders: ['Set-Cookie'],
    optionsSuccessStatus: 200,
    preflightContinue: false,
  });

  const port = parseInt(process.env.ADMIN_PANEL_PORT, 10);
  await app.listen(port, '0.0.0.0'); // Bind to all interfaces for deployment

  const adminUrl = process.env.ADMIN_PANEL_URL
    || `http://localhost:${port}${process.env.NODE_ENV === 'production'
      ? '/'
      : '/admin'}`;
  console.log(`\n☑️ Admin Panel is available on: ${adminUrl}`);
}
bootstrap();
