import { Prisma } from '@beemood/pms-db/client';
import { ClientModule } from '@beemood/prisma';
import { Module } from '@nestjs/common';
import { ProjectController } from './project.controller.js';

@Module({
  imports: [ClientModule.forFeature({ models: [Prisma.ModelName.Project] })],
  controllers: [ProjectController],
})
export class ProjectModule {}
