import { RestModule } from '@bmod/factory';
import { Module } from '@nestjs/common';
import {
  CreateCategoryDto,
  ReadCategoryDto,
  UpdateCategoryDto,
} from './category/dto/category.dto.js';
import {
  CategoryFindManyArgsDto,
  CategoryFindOneArgsDto,
} from './category/dto/query-category.dto.js';
import {
  CreateDepartmentDto,
  ReadDepartmentDto,
  UpdateDepartmentDto,
} from './department/dto/department.dto.js';
import {
  DepartmentFindManyArgsDto,
  DepartmentFindOneArgsDto,
} from './department/dto/query-department.dto.js';
@Module({
  imports: [
    RestModule.configure({
      name: 'category',
      readDto: () => ReadCategoryDto,
      createDto: () => CreateCategoryDto,
      updateDto: () => UpdateCategoryDto,
      findManyDto: () => CategoryFindManyArgsDto,
      findOneDto: () => CategoryFindOneArgsDto,
    }),
    RestModule.configure({
      name: 'department',
      readDto: () => ReadDepartmentDto,
      createDto: () => CreateDepartmentDto,
      updateDto: () => UpdateDepartmentDto,
      findManyDto: () => DepartmentFindManyArgsDto,
      findOneDto: () => DepartmentFindOneArgsDto,
    }),
  ],
})
export class FactoryModule {}
