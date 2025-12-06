import { PrismaModule } from '@beemood/nestjs-prisma';
import { Prisma } from '@beemood/sample-db';
import { Module } from '@nestjs/common';
import { SampleController } from './sample.controller.js';

@Module({
  imports: [PrismaModule.forFeature([Prisma.ModelName.Sample])],
  controllers: [SampleController],
})
export class SampleModule {}
