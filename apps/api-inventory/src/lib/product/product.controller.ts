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
import type { CreateProductDto } from './dto/create-product.dto.js';
import { Product } from './dto/product.dto.js';
import type { QueryProductDto } from './dto/query-product.dto.js';

@ResourceController('products')
export class ProductController {
  @CreateOne({ responseType: () => Product })
  createOne(@Body() body: CreateProductDto) {
    return {
      some: 'Some goes here',
      body,
    };
  }

  @FindAll({ responseType: () => Product })
  findAll(@Query() query: QueryProductDto) {
    return [query];
  }

  @FindOneById({ responseType: () => Product })
  findOneById(@ParamId() id: number, @Query() query: QueryProductDto) {
    return { id, query };
  }

  @UpdateOneById({ responseType: () => Product })
  updateOneById(@ParamId() id: number, @Query() query: QueryProductDto) {
    return { id, query };
  }

  @DeleteOneById({ responseType: () => Product })
  deleteOneById(@ParamId() id: number, @Query() query: QueryProductDto) {
    return { id, query };
  }
}
