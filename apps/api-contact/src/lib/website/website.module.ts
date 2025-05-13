import { PrismaModule } from '@bmod/prisma';
import { Module } from '@nestjs/common';
import { WebsiteController } from './website.controller.js';

@Module({
  imports: [PrismaModule.forFeature({ resources: ['website'] })],
  controllers: [WebsiteController],
})
export class WebsiteModule {}
