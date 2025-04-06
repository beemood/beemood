import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HelloAppController } from './hello-app.controller.js';
import { HelloAppService } from './hello-app.service.js';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [HelloAppController],
  providers: [HelloAppService],
})
export class HelloAppModule {}
