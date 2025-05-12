import { PrismaModule } from '@bmod/prisma';
import { Module } from '@nestjs/common';
import { DepartmentController } from './department.controller.js';

@Module({
  imports: [PrismaModule.forFeature({ resources: ['department'] })],
  controllers: [DepartmentController],
})
export class DepartmentModule {}
