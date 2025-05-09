import { PrismaModule } from '@bmod/prisma';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { CategoryModule } from './category/category.module.js';
import { PriceLevelModule } from './price-level/price-level.module.js';
import { ProductModule } from './product/product.module.js';

@Module({
  imports: [
    ConfigModule,
    EventEmitterModule,
    PrismaModule.forRoot(),
    ProductModule,
    CategoryModule,
    PriceLevelModule,
  ],
})
export class InventoryModule {}
