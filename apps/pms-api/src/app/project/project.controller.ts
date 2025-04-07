/* eslint-disable @nx/enforce-module-boundaries */
import { RestBuilder } from '@bmod/rest';
import { Body, Param, ParseIntPipe, Query } from '@nestjs/common';
import type { PrismaClient } from '@prisma/pms';
import {
  CreateProjectDto,
  ProjectDto,
  QueryProjectDto,
  UpdateProjectDto,
} from './project.dto.js';

const R = new RestBuilder({
  dto: ProjectDto,
  createDto: CreateProjectDto,
  updateDto: UpdateProjectDto,
  queryDto: QueryProjectDto,
});

@R.Controller('projects')
export class ProjectController {
  constructor(protected readonly repository: PrismaClient) {}

  @R.Create()
  create(@Body() dto: CreateProjectDto) {
    return this.repository.project.create({ data: dto, select: { id: true } });
  }

  @R.Read()
  read(@Query() query: QueryProjectDto) {
    return this.repository.project.findMany({
      where: {
        name: {
          contains: query.name,
        },
        description: {
          contains: query.description,
        },
      },
    });
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
