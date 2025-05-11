import { InjectRepository, PrismaModule } from '@bmod/prisma';
import type { OnModuleInit } from '@nestjs/common';
import { Module } from '@nestjs/common';
import type { Prisma } from '@prisma/client';
import { productData } from './product-data.js';
import { ProductController } from './product.controller.js';

@Module({
  imports: [
    PrismaModule.forFeature({ resources: ['product', 'productVariant'] }),
  ],
  controllers: [ProductController],
})
export class ProductModule implements OnModuleInit {
  constructor(
    @InjectRepository('product')
    protected readonly repo: Prisma.ProductDelegate
  ) {}

  async onModuleInit() {
    try {
      await this.repo.createMany({ data: productData });
    } catch (err) {
      //
    }
  }
}
