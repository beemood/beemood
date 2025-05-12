import { PrismaModule } from '@bmod/prisma';
import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller.js';

@Module({
  imports: [PrismaModule.forFeature({ resources: ['category'] })],
  controllers: [CategoryController],
})
export class CategoryModule {}
