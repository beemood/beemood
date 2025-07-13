import { Controller, Get, Inject } from '@nestjs/common';
import { CategoryService } from './category.service.js';

@Controller('category')
export class CategoryController {
  constructor(
    @Inject(CategoryService) protected readonly service: CategoryService
  ) {}

  @Get()
  findAll() {
    return this.service.findMany();
  }
}
