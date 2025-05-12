import { PrismaModule } from '@bmod/prisma';
import { Module } from '@nestjs/common';
import { ProductVariantController } from './product-variant.controller.js';

@Module({
  imports: [PrismaModule.forFeature({ resources: ['productVariant'] })],
  controllers: [ProductVariantController],
})
export class ProductVariantModule {}
