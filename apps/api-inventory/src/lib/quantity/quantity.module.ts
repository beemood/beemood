import { PrismaModule } from '@bmod/prisma';
import { Module } from '@nestjs/common';
import { QuantityController } from './quantity.controller.js';

@Module({
  imports: [PrismaModule.forFeature({ resources: ['quantity'] })],
  controllers: [QuantityController],
})
export class QuantityModule {}
