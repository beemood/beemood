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
  CreateDepartmentDto,
  ReadDepartmentDto,
  UpdateDepartmentDto,
} from './dto/department.dto.js';
import {
  DepartmentFindManyArgsDto,
  DepartmentFindOneArgsDto,
  DepartmentSelectArgsDto,
} from './dto/query-department.dto.js';

@ResourceController('departments')
export class DepartmentController {
  constructor(
    @InjectRepository('department')
    protected readonly repository: Prisma.DepartmentDelegate
  ) {}

  @CreateOne({
    responseType: () => ReadDepartmentDto,
    queryDto: () => DepartmentSelectArgsDto,
    createDto: () => CreateDepartmentDto,
  })
  async createOne(
    @Body() data: CreateDepartmentDto,
    @Query() query: DepartmentSelectArgsDto
  ) {
    return await this.repository.create({ ...query, data });
  }

  @FindAll({
    responseType: () => ReadDepartmentDto,
    queryDto: () => DepartmentFindManyArgsDto,
  })
  findAll(@Query() query: DepartmentFindManyArgsDto) {
    return this.repository.findMany(query);
  }

  @FindOneById({
    responseType: () => ReadDepartmentDto,
    queryDto: () => DepartmentFindOneArgsDto,
  })
  findOneById(@ParamId() id: number, @Query() query: DepartmentFindOneArgsDto) {
    return this.repository.findUnique({
      ...query,
      where: { ...query.where, id },
    });
  }

  @UpdateOneById({
    responseType: () => ReadDepartmentDto,
    updateDto: () => UpdateDepartmentDto,
    queryDto: () => DepartmentFindManyArgsDto,
  })
  updateOneById(
    @ParamId() id: number,
    @Body() data: UpdateDepartmentDto,
    @Query() query: DepartmentFindOneArgsDto
  ) {
    return this.repository.update({
      ...query,
      where: { ...query.where, id },
      data,
    });
  }

  @DeleteOneById({
    responseType: () => ReadDepartmentDto,
    queryDto: () => DepartmentFindOneArgsDto,
  })
  deleteOneById(
    @ParamId() id: number,
    @Query() query: DepartmentFindOneArgsDto
  ) {
    return this.repository.delete({
      ...query,
      where: { ...query.where, id },
    });
  }
}
