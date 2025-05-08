import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ProductModule } from './product/product.module.js';

@Module({
  imports: [ConfigModule, EventEmitterModule, ProductModule],
})
export class InventoryModule {}
