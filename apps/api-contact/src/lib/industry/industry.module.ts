import { PrismaModule } from '@bmod/prisma';
import { Module } from '@nestjs/common';
import { IndustryController } from './industry.controller.js';

@Module({
  imports: [PrismaModule.forFeature({ resources: ['industry'] })],
  controllers: [IndustryController],
})
export class IndustryModule {}
