import {
  ArgsId,
  AutoResolver,
  FindArgs,
  FindMany,
  FindOneById,
} from '@beemood/nestjs/graphql';
import { type Prisma } from '@beemood/pms-db/client';
import { InjectDelegate } from '@beemood/prisma';
import { Args, Mutation, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { ProjectCreateDto } from './input/project-create.dto.js';
import { ProjectFindManyDto } from './input/project-find-many.dto.js';
import { ProjectUpdateDto } from './input/project-update.dto.js';
import { ProjectDto } from './input/project.dto.js';

@AutoResolver(() => ProjectDto)
export class ProjectResolver {
  protected readonly pubSub = new PubSub();
  constructor(
    @InjectDelegate()
    protected readonly delegate: Prisma.ProjectDelegate,
  ) {}

  @FindMany(() => [ProjectDto])
  async findMany(
    @FindArgs(() => ProjectFindManyDto) query: ProjectFindManyDto,
  ) {
    return await this.delegate.findMany(query);
  }

  @FindOneById(() => ProjectDto)
  async findOneById(@ArgsId() id: number) {
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
