/* eslint-disable @nx/enforce-module-boundaries */
import { Prisma } from '@beemood/inventory-db';
import {
  AutoMethod,
  Body,
  ParamId,
  Query,
  ResourceController,
} from '@beenest/nest';

import { InjectRepository } from '@beenest/prisma';
import { inspect } from 'util';
import {
  type CreateCategory,
  CreateCategorySchema,
} from './schemas/create-category';
import {
  type QueryManyCategories,
  QueryManyCategoriesSchema,
} from './schemas/query-many-categories';
import {
  type UpdateCategory,
  UpdateCategorySchema,
} from './schemas/update-category';

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
  async findMany(@Query(QueryManyCategoriesSchema) query: QueryManyCategories) {
    console.log(inspect(query, true, 100));

    return await this.repo.findMany({
      take: query?.take,
      skip: query?.skip,
      select: query?.select,
      where: query?.where,
    });
  }

  @AutoMethod()
  async findOneById(@ParamId() id: number) {
    return await this.repo.findUniqueOrThrow({ where: { id } });
  }

  @AutoMethod()
  async updateOneById(
    @ParamId() id: number,
    @Body(UpdateCategorySchema) data: UpdateCategory
  ) {
    await this.repo.findUniqueOrThrow({ where: { id } });
    return await this.repo.update({ where: { id }, data });
  }

  @AutoMethod()
  async deleteOneById(@ParamId() id: number) {
    return await this.repo.delete({ where: { id } });
  }
}
