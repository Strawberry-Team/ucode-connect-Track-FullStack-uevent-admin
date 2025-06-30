import { Module } from '@nestjs/common';
import { AdminModule } from '@adminjs/nestjs';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import provider from './admin/auth-provider.js';
import { getAdminOptions } from './admin/options.js';
import { 
  getSimpleSessionConfig, 
  getImprovedSessionConfig, 
  getSecureSessionConfig 
} from './config/session.config.js';

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
            cookiePassword: process.env.COOKIE_SECRET || 'fallback-secret-for-development',
            cookieName: 'adminjs',
          },
          // sessionOptions: getSimpleSessionConfig(),
          
          // 🛡️ RECOMMENDED: Gradually improved security
          sessionOptions: getImprovedSessionConfig(),
          
          // 🔒 MAXIMUM SECURITY: Use when ready for full security
          // sessionOptions: getSecureSessionConfig(),
        };
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
