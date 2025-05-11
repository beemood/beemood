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
  CreateProductVariantDto,
  ReadProductVariantDto,
  UpdateProductVariantDto,
} from './dto/product-variant.dto.js';
import {
  ProductVariantFindManyArgsDto,
  ProductVariantFindOneArgsDto,
  ProductVariantSelectArgsDto,
} from './dto/query-product-variant.dto.js';

@ResourceController('product-variants')
export class ProductVariantController {
  constructor(
    @InjectRepository('productVariant')
    protected readonly repository: Prisma.ProductVariantDelegate
  ) {}

  @CreateOne({
    responseType: () => ReadProductVariantDto,
    queryDto: () => ProductVariantSelectArgsDto,
    createDto: () => CreateProductVariantDto,
  })
  async createOne(
    @Body() data: CreateProductVariantDto,
    @Query() query: ProductVariantSelectArgsDto
  ) {
    return await this.repository.create({ ...query, data });
  }

  @FindAll({
    responseType: () => ReadProductVariantDto,
    queryDto: () => ProductVariantFindManyArgsDto,
  })
  findAll(@Query() query: ProductVariantFindManyArgsDto) {
    return this.repository.findMany(query);
  }

  @FindOneById({
    responseType: () => ReadProductVariantDto,
    queryDto: () => ProductVariantFindOneArgsDto,
  })
  findOneById(
    @ParamId() id: number,
    @Query() query: ProductVariantFindOneArgsDto
  ) {
    return this.repository.findFirst({
      ...query,
      where: { ...query.where, id },
    });
  }

  @UpdateOneById({
    responseType: () => ReadProductVariantDto,
    updateDto: () => UpdateProductVariantDto,
    queryDto: () => ProductVariantFindManyArgsDto,
  })
  updateOneById(
    @ParamId() id: number,
    @Body() data: UpdateProductVariantDto,
    @Query() query: ProductVariantFindOneArgsDto
  ) {
    return this.repository.update({
      ...query,
      where: { ...query.where, id },
      data,
    });
  }

  @DeleteOneById({
    responseType: () => ReadProductVariantDto,
    queryDto: () => ProductVariantFindOneArgsDto,
  })
  deleteOneById(
    @ParamId() id: number,
    @Query() query: ProductVariantFindOneArgsDto
  ) {
    return this.repository.delete({
      ...query,
      where: { ...query.where, id },
    });
  }
}
