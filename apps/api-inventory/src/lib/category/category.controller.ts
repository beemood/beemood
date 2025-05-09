import {
  Body,
  CreateOne,
  DeleteOneById,
  FindAll,
  FindOneById,
  ParamId,
  Query,
  ResourceController,
  UpdateOneById,
} from '@bmod/nest';
import { InjectRepository } from '@bmod/prisma';
import type { Prisma } from '@prisma/client';
import {
  CreateCategoryDto,
  ReadCategoryDto,
  UpdateCategoryDto,
} from './dto/category.dto.js';
import {
  CategoryFindManyArgsDto,
  CategoryFindOneArgsDto,
  CategorySelectArgsDto,
} from './dto/query-category.dto.js';

@ResourceController('categories')
export class CategoryController {
  constructor(
    @InjectRepository('category')
    protected readonly repository: Prisma.CategoryDelegate
  ) {}

  @CreateOne({
    responseType: () => ReadCategoryDto,
    queryDto: () => CategorySelectArgsDto,
    createDto: () => CreateCategoryDto,
  })
  async createOne(
    @Body() data: CreateCategoryDto,
    @Query() query: CategorySelectArgsDto
  ) {
    return await this.repository.create({ ...query, data });
  }

  @FindAll({
    responseType: () => ReadCategoryDto,
    queryDto: () => CategoryFindManyArgsDto,
  })
  findAll(@Query() findManyArgs: CategoryFindManyArgsDto) {
    return this.repository.findMany(findManyArgs);
  }

  @FindOneById({
    responseType: () => ReadCategoryDto,
    queryDto: () => CategoryFindOneArgsDto,
  })
  findOneById(@ParamId() id: number, @Query() query: CategoryFindOneArgsDto) {
    return this.repository.findUnique({
      ...query,
      where: { ...query.where, id },
    });
  }

  @UpdateOneById({
    responseType: () => ReadCategoryDto,
    updateDto: () => UpdateCategoryDto,
    queryDto: () => CategoryFindManyArgsDto,
  })
  updateOneById(
    @ParamId() id: number,
    @Body() data: UpdateCategoryDto,
    @Query() query: CategoryFindOneArgsDto
  ) {
    return this.repository.update({
      ...query,
      where: { ...query.where, id },
      data,
    });
  }

  @DeleteOneById({
    responseType: () => ReadCategoryDto,
    queryDto: () => CategoryFindOneArgsDto,
  })
  deleteOneById(@ParamId() id: number, @Query() query: CategoryFindOneArgsDto) {
    return this.repository.delete({
      ...query,
      where: { ...query.where, id },
    });
  }
}
