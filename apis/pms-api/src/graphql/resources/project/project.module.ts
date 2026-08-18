import { Module } from '@beemood/nestjs';
import { Prisma } from '@beemood/pms-db/client';
import { ClientModule, InjectDelegate } from '@beemood/prisma';
import { ProjectResolver } from './project.resolver.js';

/** CHnage 2  */
@Module({
  imports: [ClientModule.forFeature({ models: [Prisma.ModelName.Project] })],
  providers: [ProjectResolver],
})
export class ProjectModule {
  constructor(
    @InjectDelegate()
    protected readonly delegate: Prisma.ProjectDelegate,
  ) {}
}
