import { Body, ParamId, Query, RestBuilder } from '@bmod/rest';
import { Inject } from '@nestjs/common';
import { PrismaClient } from '@prisma/pms';
import {
  CreateProjectDto,
  ProjectDto,
  ProjectQueryDto,
  UpdateProjectDto,
} from './project.dto.js';

const R = new RestBuilder({
  dto: ProjectDto,
  createDto: CreateProjectDto,
  updateDto: UpdateProjectDto,
  queryDto: ProjectQueryDto,
});

@R.Controller('projects')
export class ProjectController {
  constructor(
    @Inject(PrismaClient) protected readonly repository: PrismaClient
  ) {}

  @R.Create()
  create(@Body() dto: CreateProjectDto) {
    return this.repository.project.create({ data: dto, select: { id: true } });
  }

  @R.Read()
  read(@Query() query: ProjectQueryDto) {
    return this.repository.project.findMany({ ...query });
  }

  @R.ReadById()
  readById(@ParamId() id: number) {
    return this.repository.project.findUnique({ where: { id } });
  }

  @R.UpdateById()
  updateById(@ParamId() id: number, @Body() dto: UpdateProjectDto) {
    return this.repository.project.update({
      where: { id },
      data: { ...dto, updatedAt: new Date() },
      select: { id: true },
    });
  }

  @R.DeleteById()
  deleteById(@ParamId() id: number) {
    const timestamp = new Date();
    return this.repository.project.update({
      where: { id },
      data: { updatedAt: timestamp, deletedAt: timestamp },
      select: { id: true },
    });
  }
}
