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
import { InjectRepo } from '@bmod/prisma';
import type { Prisma as P } from '@prisma/client';
import {
  CreateTagDto as CreateDto,
  ReadTagDto as ReadDto,
  UpdateTagDto as UpdateDto,
} from './dto/tag.dto.js';
import {
  TagFindManyArgsDto as FindManyDto,
  TagFindOneArgsDto as FindOneDto,
  TagSelectArgsDto as SelectDto,
} from './dto/query-tag.dto.js';

@ResourceController('tag', [
  CreateDto,
  UpdateDto,
  SelectDto,
  FindOneDto,
  FindManyDto,
])
export class TagController {
  constructor(@InjectRepo('tag') protected readonly repo: P.TagDelegate) {}

  @CreateOne(() => ReadDto)
  async createOne(@Body() data: CreateDto, @Query() query: SelectDto) {
    return await this.repo.create({ ...query, data });
  }

  @FindAll(() => ReadDto)
  async findAll(@Query() query: FindManyDto) {
    return await this.repo.findMany(query);
  }

  @FindOneById(() => ReadDto)
  async findOneById(@ParamId() id: number, @Query() query: FindOneDto) {
    query.where.id = id;
    return await this.repo.findFirst(query);
  }

  @UpdateOneById(() => ReadDto)
  async updateOneById(
    @ParamId() id: number,
    @Body() data: UpdateDto,
    @Query() query: FindOneDto
  ) {
    query.where.id = id;
    return await this.repo.update({ ...query, data });
  }

  @DeleteOneById(() => ReadDto)
  async deleteOneById(@ParamId() id: number, @Query() query: FindOneDto) {
    query.where.id = id;
    return await this.repo.delete(query);
  }
}
