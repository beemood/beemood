import { PrismaModule } from '@bmod/prisma';
import { Module } from '@nestjs/common';
import { PriceController } from './price.controller.js';

@Module({
  imports: [PrismaModule.forFeature({ resources: ['price'] })],
  controllers: [PriceController],
})
export class PriceModule {}
