import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { PrismaClientModule } from '@beemood/prisma';

@Module({
  imports: [PrismaClientModule.forFeature({ resourceNames: ['category'] })],
  controllers: [CategoryController],
})
export class CategoryModule {}
