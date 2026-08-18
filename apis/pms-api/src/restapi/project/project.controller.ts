import { type Prisma } from '@beemood/pms-db/client';
import { InjectDelegate } from '@beemood/prisma';
import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { type ProjectCreateDto } from './dots/project-create.dto.js';
import { type ProjectFindManyDto } from './dots/project-find-many.dto.js';
import { type ProjectUpdateDto } from './dots/project-update.dto.js';

@Controller('project')
export class ProjectController {
  constructor(
    @InjectDelegate() protected readonly delegate: Prisma.ProjectDelegate,
  ) {}

  @Post()
  async create(@Body() data: ProjectCreateDto) {
    return await this.delegate.create({ data });
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: ProjectUpdateDto,
  ) {
    return this.delegate.update({ where: { id }, data });
  }

  @Post('query')
  findMany(@Body() query: ProjectFindManyDto) {
    return this.delegate.findMany(query);
  }
}
