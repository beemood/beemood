import { PrismaModule } from '@bmod/prisma';
import { Module } from '@nestjs/common';
import { TagController } from './tag.controller.js';

@Module({
  imports: [PrismaModule.forFeature({ resources: ['tag'] })],
  controllers: [TagController],
})
export class TagModule {}
