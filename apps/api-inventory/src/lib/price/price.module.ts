import { InjectRepository, PrismaModule } from '@bmod/prisma';
import type { OnModuleInit } from '@nestjs/common';
import { Module } from '@nestjs/common';
import type { Prisma } from '@prisma/client';
import { PriceController } from './price.controller.js';

@Module({
  imports: [PrismaModule.forFeature({ resources: ['price', 'category'] })],
  controllers: [PriceController],
})
export class PriceModule implements OnModuleInit {
  constructor(
    @InjectRepository('price')
    protected readonly repo: Prisma.PriceDelegate
  ) {}
  onModuleInit() {
    // Seeding
  }
}
