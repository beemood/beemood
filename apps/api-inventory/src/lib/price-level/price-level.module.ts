/* eslint-disable @nx/enforce-module-boundaries */
import { InjectRepository, PrismaModule } from '@bmod/prisma';
import type { OnModuleInit } from '@nestjs/common';
import { Module } from '@nestjs/common';
import type { Prisma } from '@prisma/client';
import { priceLevelData } from './price-level-data.js';
import { PriceLevelController } from './price-level.controller.js';

@Module({
  imports: [PrismaModule.forFeature({ resources: ['priceLevel'] })],
  controllers: [PriceLevelController],
})
export class PriceLevelModule implements OnModuleInit {
  constructor(
    @InjectRepository('priceLevel')
    protected readonly repo: Prisma.PriceLevelDelegate
  ) {}

  async onModuleInit() {
    try {
      await this.repo.createMany({ data: priceLevelData });
    } catch {
      //
    }
  }
}
