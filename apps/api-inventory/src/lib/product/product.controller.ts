/* eslint-disable @nx/enforce-module-boundaries */
import { PrismaClient } from '@bmod/inventory-db';
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
import { CreateProductDto } from './dto/create-product.dto.js';
import { QueryProductDto } from './dto/query-product.dto.js';
import { ReadProductDto } from './dto/read-product.dto.js';

@ResourceController('products')
export class ProductController {
  client = new PrismaClient({
    datasourceUrl:
      'postgresql://testuser:password@localhost:5432/inventory?schema=public',
  });
  @CreateOne({
    responseType: () => ReadProductDto,
    queryDto: () => QueryProductDto,
    createDto: () => CreateProductDto,
  })
  async createOne(@Body() body: CreateProductDto) {
    return await this.client.product.create({ data: body });
  }

  @FindAll({
    responseType: () => ReadProductDto,
    queryDto: () => QueryProductDto,
  })
  findAll(@Query() query: QueryProductDto) {
    return this.client.product.findMany({ ...query });
  }

  @FindOneById({
    responseType: () => ReadProductDto,
    queryDto: () => QueryProductDto,
  })
  findOneById(@ParamId() id: number, @Query() query: QueryProductDto) {
    return { id, query };
  }

  @UpdateOneById({
    responseType: () => ReadProductDto,
    queryDto: () => QueryProductDto,
  })
  updateOneById(@ParamId() id: number, @Query() query: QueryProductDto) {
    return { id, query };
  }

  @DeleteOneById({
    responseType: () => ReadProductDto,
    queryDto: () => QueryProductDto,
  })
  deleteOneById(@ParamId() id: number, @Query() query: QueryProductDto) {
    return { id, query };
  }
}
