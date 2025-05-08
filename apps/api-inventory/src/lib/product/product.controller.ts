import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ProductService } from './product.service.js';

@Controller('products')
export class ProductController {
  constructor(
    @Inject(ProductService) protected readonly product: ProductService
  ) {}

  @Post()
  createProduct(@Body() body: any) {
    return {
      body: 'Some goes here',
    };
  }

  @Get()
  findProducts() {
    return [];
  }

  @Get(':id')
  findProductById(@Param('id', ParseIntPipe) id: number) {
    return { id };
  }

  @Put(':id')
  updateProduct(@Param('id', ParseIntPipe) id: number) {
    return { id };
  }
}
