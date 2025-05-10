import { PrismaModule } from '@bmod/prisma';
import type { OnModuleInit } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { CategoryModule } from './category/category.module.js';
import { PriceLevelModule } from './price-level/price-level.module.js';
import { ProductModule } from './product/product.module.js';
import { StoreModule } from './store/store.module.js';

@Module({
  imports: [
    ConfigModule,
    EventEmitterModule,
    PrismaModule.forRoot(),
    CategoryModule,
    PriceLevelModule,
    ProductModule,
    StoreModule,
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
