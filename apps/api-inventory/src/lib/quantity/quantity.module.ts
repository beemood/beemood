/* eslint-disable @nx/enforce-module-boundaries */
import { InjectRepository, PrismaModule } from '@bmod/prisma';
import type { OnModuleInit } from '@nestjs/common';
import { Module } from '@nestjs/common';
import type { Prisma } from '@prisma/client';
import { QuantityController } from './quantity.controller.js';

@Module({
  imports: [PrismaModule.forFeature({ resources: ['quantity'] })],
  controllers: [QuantityController],
})
export class QuantityModule implements OnModuleInit {
  constructor(
    @InjectRepository('quantity')
    protected readonly repo: Prisma.QuantityDelegate
  ) {}
  onModuleInit() {
    //
  }
}
