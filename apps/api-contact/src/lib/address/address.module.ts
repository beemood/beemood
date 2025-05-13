import { PrismaModule } from '@bmod/prisma';
import { Module } from '@nestjs/common';
import { AddressController } from './address.controller.js';

@Module({
  imports: [PrismaModule.forFeature({ resources: ['address'] })],
  controllers: [AddressController],
})
export class AddressModule {}
