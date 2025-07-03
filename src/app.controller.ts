import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { join } from 'path';

import { AppService } from './app.service.js';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  redirectToAdmin(@Res() res: Response): void {
    res.redirect('/admin/');
  }

  @Get('favicon.ico')
  getFavicon(@Res() res: Response) {
    const faviconPath =
      process.env.NODE_ENV === 'production'
        ? process.env.ROOT_FOLDER + '/public/favicon.ico'
        : join(process.cwd(), 'public', 'favicon.ico');
    res.sendFile(faviconPath);
  }
}
