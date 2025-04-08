import { RestBuilder } from '@bmod/rest';
import { Body, Inject, Param, ParseIntPipe, Query } from '@nestjs/common';
import { PrismaClient } from '@prisma/pms';
import type { ProjectQueryDto } from './project.dto.js';
import {
  CreateProjectDto,
  ProjectDto,
  ProjectWhereDto,
  UpdateProjectDto,
} from './project.dto.js';

const R = new RestBuilder({
  dto: ProjectDto,
  createDto: CreateProjectDto,
  updateDto: UpdateProjectDto,
  queryDto: ProjectWhereDto,
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
    console.log(query);
    return this.repository.project.findMany({ ...query });
  }

  @R.ReadById()
  readById(@Param('id', ParseIntPipe) id: number) {
    return this.repository.project.findUnique({ where: { id } });
  }

  @R.UpdateById()
  updateById(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateProjectDto
  ) {
    return this.repository.project.update({
      where: { id },
      data: dto,
      select: { id: true },
    });
  }

  @R.DeleteById()
  deleteById(@Param('id', ParseIntPipe) id: number) {
    return this.repository.project.update({
      where: { id },
      data: { updatedAt: new Date() },
      select: { id: true },
    });
  }
}
