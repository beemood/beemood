import { PrismaModule } from '@bmod/prisma';
import { Module } from '@nestjs/common';
import { HrController } from './hr.controller.js';

@Module({
  imports: [PrismaModule.forFeature({ resources: ['hr'] })],
  controllers: [HrController],
})
export class HrModule {}
