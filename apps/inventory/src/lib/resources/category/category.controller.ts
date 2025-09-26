import { UseFilters } from '@nestjs/common';
import { Prisma } from '@puq/inventory-db';
import {
  AbstractResourceController,
  AutoResourceController,
  Body,
  createPrismaExceptionFilter,
  Param,
  ParamId,
  Query,
  ZodExceptionFilter,
} from '@puq/nest';
import { InjectRepository } from '@puq/prisma';
import type {
  CategoryBy,
  CategoryProjection,
  CategoryQueryMany,
  CategoryQueryOne,
  CategoryUpdate,
} from './category.schema.js';
import {
  CategoryBySchema,
  CategoryCreateSchema,
  CategoryProjectionSchema,
  CategoryQueryManySchema,
  CategoryQueryOneSchema,
  CategoryUpdateSchema,
  type CategoryCreate,
} from './category.schema.js';

@UseFilters(
  ZodExceptionFilter,
  createPrismaExceptionFilter(Prisma.PrismaClientKnownRequestError)
)
@AutoResourceController()
export class CategoryController extends AbstractResourceController {
  constructor(
    @InjectRepository() protected readonly repo: Prisma.CategoryDelegate
  ) {
    super();
  }

  override async findOneById(
    @ParamId() id: number,
    @Query(CategoryProjectionSchema) projection: CategoryProjection
  ) {
    return await this.repo.findUniqueOrThrow({ ...projection, where: { id } });
  }

  override findOne(@Query(CategoryQueryOneSchema) query: CategoryQueryOne) {
    return this.repo.findFirst({ ...query });
  }

  override findOneBy(
    @Param(CategoryBySchema) params: CategoryBy,
    @Query(CategoryProjectionSchema) query: CategoryProjection
  ) {
    return this.repo.findFirstOrThrow({
      ...query,
      where: { [params.property]: params.value },
    });
  }

  override findMany(@Query(CategoryQueryManySchema) query: CategoryQueryMany) {
    return this.repo.findMany({ ...query });
  }

  override saveOne(
    @Body(CategoryCreateSchema) body: CategoryCreate,
    @Query(CategoryProjectionSchema) projection: CategoryProjection
  ) {
    return this.repo.create({ ...projection, data: body });
  }

  override updateOneById(
    @ParamId() id: number,
    @Query(CategoryProjectionSchema) query: CategoryProjection,
    @Body(CategoryUpdateSchema) body: CategoryUpdate
  ) {
    return this.repo.update({ ...query, data: body, where: { id } });
  }

  override deleteOneById(
    @ParamId() id: number,
    @Query(CategoryProjectionSchema) query: CategoryProjection
  ) {
    return this.repo.delete({ ...query, where: { id } });
  }
}
