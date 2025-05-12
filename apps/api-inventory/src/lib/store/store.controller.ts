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
  CreateStoreDto as CreateDto,
  ReadStoreDto as ReadDto,
  UpdateStoreDto as UpdateDto,
} from './dto/store.dto.js';
import {
  StoreFindManyArgsDto as FindManyDto,
  StoreFindOneArgsDto as FindOneDto,
  StoreSelectArgsDto as SelectDto,
} from './dto/query-store.dto.js';

@ResourceController('store', [
  CreateDto,
  UpdateDto,
  SelectDto,
  FindOneDto,
  FindManyDto,
])
export class StoreController {
  constructor(@InjectRepo('store') protected readonly repo: P.StoreDelegate) {}

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
