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

@ResourceController('categries')
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
  findAll(@Query() query: CategoryFindManyArgsDto) {
    return this.repository.findMany(query);
  }

  @FindOneById({
    responseType: () => ReadCategoryDto,
    queryDto: () => CategoryFindOneArgsDto,
  })
  findOneById(@ParamId() id: number, @Query() query: CategoryFindOneArgsDto) {
    return this.repository.findFirst({
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
