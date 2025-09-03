/* eslint-disable @nx/enforce-module-boundaries */
import {
  AutoMethod,
  ParamId,
  Body,
  Query,
  ResourceController,
} from '@beenest/nest';
import { Prisma } from '@beemood/inventory-db';

import type {
  CreateCategory,
  QueryManyCategory,
  UpdateCategory,
} from './category.schema';
import {
  CreateCategorySchema,
  QueryManyCategorySchema,
  UpdateCategorySchema,
} from './category.schema';
import { InjectRepository } from '@beenest/prisma';

@ResourceController()
export class CategoryController {
  constructor(
    @InjectRepository() protected readonly repo: Prisma.CategoryDelegate
  ) {}

  @AutoMethod()
  async saveOne(@Body(CreateCategorySchema) data: CreateCategory) {
    return await this.repo.create({ data });
  }

  @AutoMethod()
  async findMany(@Query(QueryManyCategorySchema) query: QueryManyCategory) {
    return await this.repo.findMany(query);
  }

  @AutoMethod()
  async findOneById(@ParamId() id: number, @Query() query) {
    return await this.repo.findUniqueOrThrow({ where: { id } });
  }

  @AutoMethod()
  async updateOneById(
    @ParamId() id: number,
    @Body({ transform: (value) => UpdateCategorySchema.parse(value) })
    data: UpdateCategory
  ) {
    await this.repo.findUniqueOrThrow({ where: { id } });
    return await this.repo.update({ where: { id }, data });
  }

  @AutoMethod()
  async deleteOneById(@ParamId() id: number) {
    return await this.repo.delete({ where: { id } });
  }
}
