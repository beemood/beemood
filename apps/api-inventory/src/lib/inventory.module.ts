import { PrismaModule } from '@bmod/prisma';
import type { OnModuleInit } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { CategoryModule } from './category/category.module.js';
import { DepartmentModule } from './department/department.module.js';
import { PriceLevelModule } from './price-level/price-level.module.js';
import { PriceModule } from './price/price.module.js';
import { ProductVariantModule } from './product-variant/product-variant.module.js';
import { ProductModule } from './product/product.module.js';
import { QuantityModule } from './quantity/quantity.module.js';
import { StoreModule } from './store/store.module.js';
import { TagModule } from './tag/tag.module.js';

@Module({
  imports: [
    ConfigModule,
    EventEmitterModule,
    PrismaModule.forRoot(),
    CategoryModule,
    DepartmentModule,
    PriceModule,
    PriceLevelModule,
    ProductModule,
    ProductVariantModule,
    QuantityModule,
    StoreModule,
    TagModule,
  ],
})
export class InventoryModule implements OnModuleInit {
  constructor() {
    //
  }

  onModuleInit() {
    // Seed database
  }
}
