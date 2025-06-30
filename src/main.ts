import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import cookieParser from 'cookie-parser';

import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  // Connect cookie-parser with secret for signed cookies (required for cookie-session)
  app.use(cookieParser(process.env.COOKIE_SECRET || 'fallback-secret-for-development'));
  
  // Add middleware for logging cookies (for diagnostics)
  app.use((req, res, next) => {
    console.log('=== Cookie Debug Info ===');
    console.log('Request URL:', req.url);
    console.log('Request method:', req.method);
    console.log('Raw Cookie Header:', req.headers.cookie);
    console.log('Parsed Cookies:', req.cookies);
    console.log('Session ID:', req.sessionID);
    console.log('Session Data:', req.session);
    console.log('========================');
    next();
  });
  
  // Serve static files from public directory
  app.useStaticAssets(join(process.cwd(), 'public'), {
    prefix: '/public/',
  });
  
  // Enable CORS with more permissive settings for testing
  app.enableCors({
    // origin: process.env.NODE_ENV === 'production' 
    //   ? [
    //       'https://univent-admin-panel.koyeb.app',
    //       process.env.FRONTEND_URL,
    //       process.env.BACKEND_URL,
    //       process.env.ADMIN_PANEL_URL,
    //     ].filter(Boolean)
    //   : [
    //       'http://localhost:3000',
    //       'http://localhost:3001',
    //       'http://localhost:8080',
    //       process.env.FRONTEND_URL,
    //       process.env.BACKEND_URL,
    //       process.env.ADMIN_PANEL_URL,
    //     ].filter(Boolean),
    origin: true, // Дозволяємо всі origins для тестування
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS', 'HEAD'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie', 'X-Requested-With', 'Accept', 'Set-Cookie'],
    exposedHeaders: ['Set-Cookie', 'Access-Control-Allow-Origin'],
    optionsSuccessStatus: 200,
    preflightContinue: false,
  });

  const port = parseInt(process.env.ADMIN_PANEL_PORT, 10);
  await app.listen(port, '0.0.0.0'); // Bind to all interfaces for deployment

  const adminUrl = process.env.ADMIN_PANEL_URL 
    || `http://localhost:${port}${process.env.NODE_ENV === 'production' 
      ? '/' 
      : '/admin'}`;
  console.log(`\n✔ AdminJS is available on: ${adminUrl}`);
  console.log(`\n🔧 Environment: ${process.env.NODE_ENV}`);
  console.log(`\n🍪 Cookie Secret: ${process.env.COOKIE_SECRET ? 'SET' : 'NOT SET'}`);
}
bootstrap();
