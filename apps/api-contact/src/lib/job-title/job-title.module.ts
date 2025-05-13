import { PrismaModule } from '@bmod/prisma';
import { Module } from '@nestjs/common';
import { JobTitleController } from './job-title.controller.js';

@Module({
  imports: [PrismaModule.forFeature({ resources: ['jobTitle'] })],
  controllers: [JobTitleController],
})
export class JobTitleModule {}
