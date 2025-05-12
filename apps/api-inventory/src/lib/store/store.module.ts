import { PrismaModule } from '@bmod/prisma';
import { Module } from '@nestjs/common';
import { StoreController } from './store.controller.js';

@Module({
  imports: [PrismaModule.forFeature({ resources: ['store'] })],
  controllers: [StoreController],
})
export class StoreModule {}
