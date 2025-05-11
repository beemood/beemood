import { InjectRepository, PrismaModule } from '@bmod/prisma';
import type { OnModuleInit } from '@nestjs/common';
import { Module } from '@nestjs/common';
import type { Prisma } from '@prisma/client';
import { departmentData } from './department-data.js';
import { DepartmentController } from './department.controller.js';

@Module({
  imports: [PrismaModule.forFeature({ resources: ['department'] })],
  controllers: [DepartmentController],
})
export class DepartmentModule implements OnModuleInit {
  constructor(
    @InjectRepository('department')
    protected readonly repo: Prisma.DepartmentDelegate
  ) {}
  async onModuleInit() {
    try {
      await this.repo.createMany({ data: departmentData });
    } catch {
      //
    }
  }
}
