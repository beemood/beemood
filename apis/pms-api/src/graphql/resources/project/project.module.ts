import { Prisma } from '@beemood/pms-db/client';
import { ClientModule } from '@beemood/prisma';
import { Module } from '@nestjs/common';
import { ProjectResolver } from './project.resolver.js';

@Module({
  imports: [ClientModule.forFeature({ models: [Prisma.ModelName.Project] })],
  providers: [ProjectResolver],
})
export class ProjectModule {}
