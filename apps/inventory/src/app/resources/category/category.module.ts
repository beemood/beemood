import { PrismaModule } from '@beezone/prisma';
import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller.js';
import { CategoryService } from './category.service.js';

@Module({
  imports: [
    PrismaModule.forFeature({ resourceNames: ['category'] })],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
