import { InjectDelegate } from '@bmod/prisma';
import { Body, ParamId, Query } from '@bmod/rest';
import type { Prisma } from '@prisma/pms-api';
import type { CreateProjectDto } from './dto/create-project.dto.js';
import type { QueryProjectDto } from './dto/query-project.dto.js';
import type { UpdateProjectDto } from './dto/update-project.dto.js';
import { ProjectRest as R } from './project.rest.js';

@R.Controller('projects')
export class ProjectController {
  constructor(
    @InjectDelegate('project')
    protected readonly repo: Prisma.projectDelegate
  ) {}

  @R.Create()
  create(@Body() dto: CreateProjectDto) {
    return this.repo.create({ data: dto, select: { id: true } });
  }

  @R.Read()
  read(@Query() query: QueryProjectDto) {
    return this.repo.findMany({ ...query });
  }

  @R.ReadById()
  readById(@ParamId() id: number) {
    return this.repo.findUnique({ where: { id } });
  }

  @R.UpdateById()
  updateById(@ParamId() id: number, @Body() dto: UpdateProjectDto) {
    return this.repo.update({
      where: { id },
      data: { ...dto, updatedAt: new Date() },
      select: { id: true },
    });
  }

  @R.DeleteById()
  deleteById(@ParamId() id: number) {
    const timestamp = new Date();
    return this.repo.update({
      where: { id },
      data: { updatedAt: timestamp, deletedAt: timestamp },
      select: { id: true },
    });
  }
}
