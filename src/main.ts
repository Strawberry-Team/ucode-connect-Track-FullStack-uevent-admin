import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import cookieParser from 'cookie-parser';

import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  // Connect cookie-parser with secret for signed cookies (required for cookie-session)
  app.use(cookieParser(process.env.COOKIE_SECRET || 'fallback-secret-for-development'));
  
  // Serve static files from public directory
  app.useStaticAssets(join(process.cwd(), 'public'), {
    prefix: '/public/',
  });
  
  // Enable CORS for production deployment
  app.enableCors({
    origin: process.env.NODE_ENV === 'production' 
      ? [
          'https://univent-admin-panel.koyeb.app',
          process.env.FRONTEND_URL,
          process.env.BACKEND_URL,
          process.env.ADMIN_PANEL_URL,
        ].filter(Boolean)
      : [
          'http://localhost:3000',
          'http://localhost:3001',
          'http://localhost:8080',
          process.env.FRONTEND_URL,
          process.env.BACKEND_URL,
          process.env.ADMIN_PANEL_URL,
        ].filter(Boolean),
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie', 'X-Requested-With', 'Accept'],
    optionsSuccessStatus: 200, // For legacy browser support
    exposedHeaders: ['Set-Cookie'], // Allow browser to read Set-Cookie headers
  });

  const port = parseInt(process.env.ADMIN_PANEL_PORT, 10);
  await app.listen(port, '0.0.0.0'); // Bind to all interfaces for deployment

  const adminUrl = process.env.ADMIN_PANEL_URL 
    || `http://localhost:${port}${process.env.NODE_ENV === 'production' 
      ? '/' 
      : '/admin'}`;
  console.log(`\n✔ AdminJS is available on: ${adminUrl}`);
}
bootstrap();
