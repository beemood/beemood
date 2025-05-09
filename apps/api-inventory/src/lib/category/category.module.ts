import { InjectRepository, PrismaModule } from '@bmod/prisma';
import type { OnModuleInit } from '@nestjs/common';
import { Module } from '@nestjs/common';
import type { Prisma } from '@prisma/client';
import { CategoryController } from './category.controller.js';

@Module({
  imports: [PrismaModule.forFeature({ resources: ['category'] })],
  controllers: [CategoryController],
})
export class CategoryModule implements OnModuleInit {
  constructor(
    @InjectRepository('category')
    protected readonly repo: Prisma.ProductDelegate
  ) {}
  onModuleInit() {
    // Seeding
  }
}
