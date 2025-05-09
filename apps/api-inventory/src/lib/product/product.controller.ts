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
  CreateProductDto,
  ReadProductDto,
  UpdateProductDto,
} from './dto/product.dto.js';
import {
  ProductFindManyArgsDto,
  ProductFindOneArgsDto,
  ProductSelectArgsDto,
} from './dto/query-product.dto.js';

@ResourceController('products')
export class ProductController {
  constructor(
    @InjectRepository('product')
    protected readonly repository: Prisma.ProductDelegate
  ) {}

  @CreateOne({
    responseType: () => ReadProductDto,
    queryDto: () => ProductSelectArgsDto,
    createDto: () => CreateProductDto,
  })
  async createOne(
    @Body() data: CreateProductDto,
    @Query() query: ProductSelectArgsDto
  ) {
    return await this.repository.create({ ...query, data });
  }

  @FindAll({
    responseType: () => ReadProductDto,
    queryDto: () => ProductFindManyArgsDto,
  })
  findAll(@Query() query: ProductFindManyArgsDto) {
    return this.repository.findMany(query);
  }

  @FindOneById({
    responseType: () => ReadProductDto,
    queryDto: () => ProductFindOneArgsDto,
  })
  findOneById(@ParamId() id: number, @Query() query: ProductFindOneArgsDto) {
    return this.repository.findUnique({
      ...query,
      where: { ...query.where, id },
    });
  }

  @UpdateOneById({
    responseType: () => ReadProductDto,
    updateDto: () => UpdateProductDto,
    queryDto: () => ProductFindManyArgsDto,
  })
  updateOneById(
    @ParamId() id: number,
    @Body() data: UpdateProductDto,
    @Query() query: ProductFindOneArgsDto
  ) {
    return this.repository.update({
      ...query,
      where: { ...query.where, id },
      data,
    });
  }

  @DeleteOneById({
    responseType: () => ReadProductDto,
    queryDto: () => ProductFindOneArgsDto,
  })
  deleteOneById(@ParamId() id: number, @Query() query: ProductFindOneArgsDto) {
    return this.repository.delete({
      ...query,
      where: { ...query.where, id },
    });
  }
}
