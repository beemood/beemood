import { PrismaModule } from '@bmod/prisma';
import { Module } from '@nestjs/common';
import { SocialMediaController } from './social-media.controller.js';

@Module({
  imports: [PrismaModule.forFeature({ resources: ['socialMedia'] })],
  controllers: [SocialMediaController],
})
export class SocialMediaModule {}
