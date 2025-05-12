import { PrismaModule } from '@bmod/prisma';
import { Module } from '@nestjs/common';
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
    PrismaModule.forRoot(),
    CategoryModule,
    DepartmentModule,
    PriceLevelModule,
    PriceModule,
    ProductModule,
    ProductVariantModule,
    QuantityModule,
    StoreModule,
    TagModule,
  ],
})
export class InventoryModule {}
