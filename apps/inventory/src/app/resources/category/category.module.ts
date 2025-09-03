import { Module } from '@nestjs/common';
import { PrismaModule } from '@beenest/prisma';
import { CategoryController } from './category.controller';

@Module({
  imports: [PrismaModule.forFeature({ resourceNames: ['category'] })],
  controllers: [CategoryController],
})
export class CategoryModule {}
