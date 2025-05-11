/* eslint-disable @nx/enforce-module-boundaries */
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
  TagFindManyArgsDto,
  TagFindOneArgsDto,
  TagSelectArgsDto,
} from './dto/query-tag.dto.js';
import { CreateTagDto, ReadTagDto, UpdateTagDto } from './dto/tag.dto.js';

@ResourceController('tags')
export class TagController {
  constructor(
    @InjectRepository('tag')
    protected readonly repository: Prisma.TagDelegate
  ) {}

  @CreateOne({
    responseType: () => ReadTagDto,
    queryDto: () => TagSelectArgsDto,
    createDto: () => CreateTagDto,
  })
  async createOne(
    @Body() data: CreateTagDto,
    @Query() query: TagSelectArgsDto
  ) {
    return await this.repository.create({ ...query, data });
  }

  @FindAll({
    responseType: () => ReadTagDto,
    queryDto: () => TagFindManyArgsDto,
  })
  findAll(@Query() query: TagFindManyArgsDto) {
    return this.repository.findMany(query);
  }

  @FindOneById({
    responseType: () => ReadTagDto,
    queryDto: () => TagFindOneArgsDto,
  })
  findOneById(@ParamId() id: number, @Query() query: TagFindOneArgsDto) {
    return this.repository.findFirst({
      ...query,
      where: { ...query.where, id },
    });
  }

  @UpdateOneById({
    responseType: () => ReadTagDto,
    updateDto: () => UpdateTagDto,
    queryDto: () => TagFindManyArgsDto,
  })
  updateOneById(
    @ParamId() id: number,
    @Body() data: UpdateTagDto,
    @Query() query: TagFindOneArgsDto
  ) {
    return this.repository.update({
      ...query,
      where: { ...query.where, id },
      data,
    });
  }

  @DeleteOneById({
    responseType: () => ReadTagDto,
    queryDto: () => TagFindOneArgsDto,
  })
  deleteOneById(@ParamId() id: number, @Query() query: TagFindOneArgsDto) {
    return this.repository.delete({
      ...query,
      where: { ...query.where, id },
    });
  }
}
