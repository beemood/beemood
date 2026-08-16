import { AutoResolver, FindArgs, FindMany } from '@beemood/nestjs/graphql';
import { Prisma } from '@beemood/pms-db/client';
import { InjectDelegate } from '@beemood/prisma';
import { ParseIntPipe } from '@nestjs/common';
import { Args, Mutation, Query, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { ProjectCreateDto } from './input/project-create.dto.js';
import { ProjectFindManyDto } from './input/project-find-many.dto.js';
import { ProjectUpdateDto } from './input/project-update.dto.js';
import { ProjectDto } from './input/project.dto.js';

@AutoResolver({
  type: () => ProjectDto,
})
export class ProjectResolver {
  protected readonly pubSub = new PubSub();
  constructor(
    @InjectDelegate('project')
    protected readonly delegate: Prisma.ProjectDelegate,
  ) {}

  @FindMany(() => [ProjectDto], 'findManyProjects')
  async findMany(
    @FindArgs(() => ProjectFindManyDto) query: ProjectFindManyDto,
  ) {
    return await this.delegate.findMany(query);
  }

  @Query(() => ProjectDto, { name: 'findOneProjectById', nullable: true })
  async findOneById(@Args({ name: 'projectId' }, ParseIntPipe) id: number) {
    return await this.delegate.findUnique({ where: { id } });
  }

  @Mutation(() => ProjectDto, { name: 'createOneProject' })
  async createOne(
    @Args({ name: 'projectData', type: () => ProjectCreateDto })
    data: ProjectCreateDto,
  ) {
    const onProjectCreated = await this.delegate.create({ data });
    await this.pubSub.publish('PROJECT_CREATED', { onProjectCreated });

    return onProjectCreated;
  }

  @Mutation(() => ProjectDto, { name: 'updateOneProject' })
  async updateOne(
    @Args({ name: 'projectId' }) id: number,
    @Args({ name: 'projectData', type: () => ProjectUpdateDto })
    data: ProjectUpdateDto,
  ) {
    return await this.delegate.update({ where: { id }, data });
  }

  @Subscription(() => ProjectDto, { name: 'onProjectCreated' })
  async onCreated() {
    return this.pubSub.asyncIterableIterator('onProjectCreated');
  }
}
