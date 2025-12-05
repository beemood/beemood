import { PrismaModule } from '@beemood/nestjs-prisma';
import { Module } from '@nestjs/common';
import { SampleController } from './sample.controller.js';

@Module({
  imports: [PrismaModule.forFeature(['sample'])],
  controllers: [SampleController],
})
export class SampleModule {}
