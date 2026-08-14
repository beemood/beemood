import { Module } from '@nestjs/common';
import { AppModule } from './restapi/app.module.js';

@Module({
  imports: [AppModule],
})
export class MainModule {}
