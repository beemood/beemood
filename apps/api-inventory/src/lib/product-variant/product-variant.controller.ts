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
  CreateProductVariantDto as CreateDto,
  ReadProductVariantDto as ReadDto,
  UpdateProductVariantDto as UpdateDto,
} from './dto/product-variant.dto.js';
import {
  ProductVariantFindManyArgsDto as FindManyDto,
  ProductVariantFindOneArgsDto as FindOneDto,
  ProductVariantSelectArgsDto as SelectDto,
} from './dto/query-product-variant.dto.js';

@ResourceController('product-variant', [
  CreateDto,
  UpdateDto,
  SelectDto,
  FindOneDto,
  FindManyDto,
])
export class ProductVariantController {
  constructor(
    @InjectRepo('product-variant')
    protected readonly repo: P.ProductVariantDelegate
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
