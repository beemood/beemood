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
import { CreateProductDto, ReadProductDto } from './dto/product.dto.js';
import { ProductFindManyArgsDto } from './dto/query-product.dto.js';

@ResourceController('products')
export class ProductController {
  client = new PrismaClient({
    datasourceUrl:
      'postgresql://testuser:password@localhost:5432/inventory?schema=public',
  });
  @CreateOne({
    responseType: () => ReadProductDto,
    queryDto: () => ProductFindManyArgsDto,
    createDto: () => CreateProductDto,
  })
  async createOne(@Body() body: CreateProductDto) {
    return await this.client.product.create({ data: body });
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
    queryDto: () => ProductFindManyArgsDto,
  })
  findOneById(@ParamId() id: number, @Query() query: ProductFindManyArgsDto) {
    return { id, query };
  }

  @UpdateOneById({
    responseType: () => ReadProductDto,
    queryDto: () => ProductFindManyArgsDto,
  })
  updateOneById(@ParamId() id: number, @Query() query: ProductFindManyArgsDto) {
    return { id, query };
  }

  @DeleteOneById({
    responseType: () => ReadProductDto,
    queryDto: () => ProductFindManyArgsDto,
  })
  deleteOneById(@ParamId() id: number, @Query() query: ProductFindManyArgsDto) {
    return { id, query };
  }
}
