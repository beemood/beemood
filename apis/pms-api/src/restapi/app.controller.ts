import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export class UserInfo {
  userId: number;
}

@Controller('main')
export class AppController {
  constructor(protected readonly config: ConfigService) {}

  @Get('app-id')
  appId() {
    const appId = this.config.get('APP_ID');
    const port = this.config.get('PORT');

    return { appId, port };
  }
}
