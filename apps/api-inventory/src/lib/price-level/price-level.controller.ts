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
  CreatePriceLevelDto,
  ReadPriceLevelDto,
  UpdatePriceLevelDto,
} from './dto/price-level.dto.js';
import {
  PriceLevelFindManyArgsDto,
  PriceLevelFindOneArgsDto,
  PriceLevelSelectArgsDto,
} from './dto/query-price-level.dto.js';

@ResourceController('price-levels')
export class PriceLevelController {
  constructor(
    @InjectRepository('priceLevel')
    protected readonly repository: Prisma.PriceLevelDelegate
  ) {}

  @CreateOne({
    responseType: () => ReadPriceLevelDto,
    queryDto: () => PriceLevelSelectArgsDto,
    createDto: () => CreatePriceLevelDto,
  })
  async createOne(
    @Body() data: CreatePriceLevelDto,
    @Query() query: PriceLevelSelectArgsDto
  ) {
    return await this.repository.create({ ...query, data });
  }

  @FindAll({
    responseType: () => ReadPriceLevelDto,
    queryDto: () => PriceLevelFindManyArgsDto,
  })
  findAll(@Query() query: PriceLevelFindManyArgsDto) {
    return this.repository.findMany(query);
  }

  @FindOneById({
    responseType: () => ReadPriceLevelDto,
    queryDto: () => PriceLevelFindOneArgsDto,
  })
  findOneById(@ParamId() id: number, @Query() query: PriceLevelFindOneArgsDto) {
    return this.repository.findFirst({
      ...query,
      where: { ...query.where, id },
    });
  }

  @UpdateOneById({
    responseType: () => ReadPriceLevelDto,
    updateDto: () => UpdatePriceLevelDto,
    queryDto: () => PriceLevelFindManyArgsDto,
  })
  updateOneById(
    @ParamId() id: number,
    @Body() data: UpdatePriceLevelDto,
    @Query() query: PriceLevelFindOneArgsDto
  ) {
    return this.repository.update({
      ...query,
      where: { ...query.where, id },
      data,
    });
  }

  @DeleteOneById({
    responseType: () => ReadPriceLevelDto,
    queryDto: () => PriceLevelFindOneArgsDto,
  })
  deleteOneById(
    @ParamId() id: number,
    @Query() query: PriceLevelFindOneArgsDto
  ) {
    return this.repository.delete({
      ...query,
      where: { ...query.where, id },
    });
  }
}
