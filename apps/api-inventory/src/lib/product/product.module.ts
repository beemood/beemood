import { InjectRepository, PrismaModule } from '@bmod/prisma';
import type { OnModuleInit } from '@nestjs/common';
import { Module } from '@nestjs/common';
import type { Prisma } from '@prisma/client';
import { ProductController } from './product.controller.js';

@Module({
  imports: [PrismaModule.forFeature({ resources: ['product', 'category'] })],
  controllers: [ProductController],
})
export class ProductModule implements OnModuleInit {
  constructor(
    @InjectRepository('product')
    protected readonly repo: Prisma.ProductDelegate
  ) {}
  onModuleInit() {
    // Seeding
  }
}
