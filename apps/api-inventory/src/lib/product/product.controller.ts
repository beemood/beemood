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
import { PrismaClient } from '@prisma/client';
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
  client = new PrismaClient({
    datasourceUrl:
      'postgresql://testuser:password@localhost:5432/inventory?schema=public',
  });

  @CreateOne({
    responseType: () => ReadProductDto,
    queryDto: () => ProductSelectArgsDto,
    createDto: () => CreateProductDto,
  })
  async createOne(
    @Body() body: CreateProductDto,
    @Query() query: ProductSelectArgsDto
  ) {
    return await this.client.product.create({ ...query, data: body });
  }

  @FindAll({
    responseType: () => ReadProductDto,
    queryDto: () => ProductFindManyArgsDto,
  })
  findAll(@Query() query: ProductFindManyArgsDto) {
    return this.client.product.findMany({ ...query });
  }

  @FindOneById({
    responseType: () => ReadProductDto,
    queryDto: () => ProductFindOneArgsDto,
  })
  findOneById(@ParamId() id: number, @Query() query: ProductFindOneArgsDto) {
    return this.client.product.findUnique({ ...query });
  }

  @UpdateOneById({
    responseType: () => ReadProductDto,
    updateDto: () => UpdateProductDto,
    queryDto: () => ProductFindManyArgsDto,
  })
  updateOneById(
    @ParamId() id: number,
    @Body() body: UpdateProductDto,
    @Query() query: ProductFindOneArgsDto
  ) {
    return this.client.product.update({ ...query, data: { ...body } });
  }

  @DeleteOneById({
    responseType: () => ReadProductDto,
    queryDto: () => ProductFindOneArgsDto,
  })
  deleteOneById(@ParamId() id: number, @Query() query: ProductFindOneArgsDto) {
    return this.client.product.delete({
      ...query,
      where: { ...query.where, id },
    });
  }
}
