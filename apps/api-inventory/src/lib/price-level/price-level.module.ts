import { PrismaModule } from '@bmod/prisma';
import { Module } from '@nestjs/common';
import { PriceLevelController } from './price-level.controller.js';

@Module({
  imports: [PrismaModule.forFeature({ resources: ['priceLevel'] })],
  controllers: [PriceLevelController],
})
export class PriceLevelModule {}
