import { Prisma } from '@beemood/pms-db/client';
import { InjectDelegate } from '@beemood/prisma';
import { ParseIntPipe } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { ProjectFindManyDto } from './input/project-find-many.dto.js';
import { ProjectDto } from './input/project.dto.js';

@Resolver(() => ProjectDto)
export class ProjectResolver {
  constructor(
    @InjectDelegate('project')
    protected readonly delegate: Prisma.ProjectDelegate,
  ) {}

  @Query(() => [ProjectDto], { name: 'findManyProject' })
  async findMany(
    @Args({ type: () => ProjectFindManyDto, name: 'query', nullable: true })
    query: ProjectFindManyDto,
  ) {
    return await this.delegate.findMany(query);
  }

  @Query(() => ProjectDto, { name: 'findOneProjectById', nullable: true })
  async findOneById(@Args({ name: 'projectId' }, ParseIntPipe) id: number) {
    return await this.delegate.findUnique({ where: { id } });
  }
}
