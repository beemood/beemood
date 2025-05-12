import { PrismaModule } from '@bmod/prisma';
import { Module } from '@nestjs/common';
import { ProductController } from './product.controller.js';

@Module({
  imports: [PrismaModule.forFeature({ resources: ['product'] })],
  controllers: [ProductController],
})
export class ProductModule {}
