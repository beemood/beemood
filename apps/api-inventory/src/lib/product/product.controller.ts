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
import { InjectRepo } from '@bmod/prisma';
import type { Prisma as P } from '@prisma/client';
import {
  CreateProductDto as CreateDto,
  ReadProductDto as ReadDto,
  UpdateProductDto as UpdateDto,
} from './dto/product.dto.js';
import {
  ProductFindManyArgsDto as FindManyDto,
  ProductFindOneArgsDto as FindOneDto,
  ProductSelectArgsDto as SelectDto,
} from './dto/query-product.dto.js';

@ResourceController('product', [
  CreateDto,
  UpdateDto,
  SelectDto,
  FindOneDto,
  FindManyDto,
])
export class ProductController {
  constructor(
    @InjectRepo('product') protected readonly repo: P.ProductDelegate
  ) {}

  @CreateOne(() => ReadDto)
  async createOne(@Body() data: CreateDto, @Query() query: SelectDto) {
    return await this.repo.create({ ...query, data });
  }

  @FindAll(() => ReadDto)
  async findAll(@Query() query: FindManyDto) {
    return await this.repo.findMany(query);
  }

  @FindOneById(() => ReadDto)
  async findOneById(@ParamId() id: number, @Query() query: FindOneDto) {
    query.where.id = id;
    return await this.repo.findFirst(query);
  }

  @UpdateOneById(() => ReadDto)
  async updateOneById(
    @ParamId() id: number,
    @Body() data: UpdateDto,
    @Query() query: FindOneDto
  ) {
    query.where.id = id;
    return await this.repo.update({ ...query, data });
  }

  @DeleteOneById(() => ReadDto)
  async deleteOneById(@ParamId() id: number, @Query() query: FindOneDto) {
    query.where.id = id;
    return await this.repo.delete(query);
  }
}
