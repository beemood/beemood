import { InjectRepository, PrismaModule } from '@bmod/prisma';
import type { OnModuleInit } from '@nestjs/common';
import { Module } from '@nestjs/common';
import type { Prisma } from '@prisma/client';
import { StoreController } from './store.controller.js';

@Module({
  imports: [PrismaModule.forFeature({ resources: ['store', 'category'] })],
  controllers: [StoreController],
})
export class StoreModule implements OnModuleInit {
  constructor(
    @InjectRepository('store')
    protected readonly repo: Prisma.StoreDelegate
  ) {}
  onModuleInit() {
    // Seed database
  }
}
