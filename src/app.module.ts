import { Module } from '@nestjs/common';
import { AdminModule } from '@adminjs/nestjs';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import provider from './admin/auth-provider.js';
import { getAdminOptions } from './admin/options.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development',
      isGlobal: true,
    }),
    AdminModule.createAdminAsync({
      useFactory: async () => {
        const options = await getAdminOptions();
        return {
          adminJsOptions: options,
          auth: {
            provider,
            cookiePassword: process.env.COOKIE_SECRET,
            cookieName: 'adminjs',
          },
          sessionOptions: {
            resave: false,
            saveUninitialized: false,
            secret: process.env.COOKIE_SECRET,
            cookie: {
              secure: process.env.NODE_ENV === 'production',
              httpOnly: true,
              sameSite: process.env.NODE_ENV === 'production' ? 'lax' : 'strict',
              domain: undefined, // Let browser handle domain automatically
              path: '/',              
              maxAge: 24 * 60 * 60 * 1000, // 24 hours
            },
          },
        };
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
