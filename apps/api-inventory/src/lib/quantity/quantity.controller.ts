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
  CreateQuantityDto as CreateDto,
  ReadQuantityDto as ReadDto,
  UpdateQuantityDto as UpdateDto,
} from './dto/quantity.dto.js';
import {
  QuantityFindManyArgsDto as FindManyDto,
  QuantityFindOneArgsDto as FindOneDto,
  QuantitySelectArgsDto as SelectDto,
} from './dto/query-quantity.dto.js';

@ResourceController('quantity', [
  CreateDto,
  UpdateDto,
  SelectDto,
  FindOneDto,
  FindManyDto,
])
export class QuantityController {
  constructor(
    @InjectRepo('quantity') protected readonly repo: P.QuantityDelegate
  ) {}

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
    return await this.repo.findFirst({
      ...query,
      where: { ...query.where, id },
    });
  }

  @UpdateOneById(() => ReadDto)
  async updateOneById(
    @ParamId() id: number,
    @Body() data: UpdateDto,
    @Query() query: FindOneDto
  ) {
    return await this.repo.update({
      ...query,
      where: { ...query.where, id },
      data,
    });
  }

  @DeleteOneById(() => ReadDto)
  async deleteOneById(@ParamId() id: number, @Query() query: FindOneDto) {
    return await this.repo.delete({ ...query, where: { ...query.where, id } });
  }
}
