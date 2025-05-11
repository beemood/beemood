import { InjectRepository, PrismaModule } from '@bmod/prisma';
import type { OnModuleInit } from '@nestjs/common';
import { Module } from '@nestjs/common';
import type { Prisma } from '@prisma/client';
import { ProductVariantController } from './product-variant.controller.js';

@Module({
  imports: [PrismaModule.forFeature({ resources: ['productVariant'] })],
  controllers: [ProductVariantController],
})
export class ProductVariantModule implements OnModuleInit {
  constructor(
    @InjectRepository('productVariant')
    protected readonly repo: Prisma.ProductVariantDelegate
  ) {}
  onModuleInit() {
    // Seeding
  }
}
