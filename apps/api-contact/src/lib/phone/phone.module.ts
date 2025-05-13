import { PrismaModule } from '@bmod/prisma';
import { Module } from '@nestjs/common';
import { PhoneController } from './phone.controller.js';

@Module({
  imports: [PrismaModule.forFeature({ resources: ['phone'] })],
  controllers: [PhoneController],
})
export class PhoneModule {}
