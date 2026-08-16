import { Module, OnModuleInit } from '@beemood/nestjs';
import { Prisma } from '@beemood/pms-db/client';
import { ClientModule, InjectDelegate } from '@beemood/prisma';
import { ProjectResolver } from './project.resolver.js';

@Module({
  imports: [ClientModule.forFeature({ models: [Prisma.ModelName.Project] })],
  providers: [ProjectResolver],
})
export class ProjectModule implements OnModuleInit {
  constructor(
    @InjectDelegate('project')
    protected readonly delegate: Prisma.ProjectDelegate,
  ) {}

  async onModuleInit() {}
}
