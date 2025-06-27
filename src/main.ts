import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS for production deployment
  app.enableCors({
    origin: [
      process.env.FRONTEND_URL,
      process.env.BACKEND_URL,
      process.env.ADMIN_PANEL_URL,
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie', 'X-Requested-With'],
  });

  await app.listen(process.env.PORT, '0.0.0.0'); // Bind to all interfaces for deployment

  console.log(`\n✔ AdminJS is available on: ${process.env.ADMIN_PANEL_URL}`);
}
bootstrap();
