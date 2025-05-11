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
  CreatePriceDto,
  ReadPriceDto,
  UpdatePriceDto,
} from './dto/price.dto.js';
import {
  PriceFindManyArgsDto,
  PriceFindOneArgsDto,
  PriceSelectArgsDto,
} from './dto/query-price.dto.js';

@ResourceController('prices')
export class PriceController {
  constructor(
    @InjectRepository('price')
    protected readonly repository: Prisma.PriceDelegate
  ) {}

  @CreateOne({
    responseType: () => ReadPriceDto,
    queryDto: () => PriceSelectArgsDto,
    createDto: () => CreatePriceDto,
  })
  async createOne(
    @Body() data: CreatePriceDto,
    @Query() query: PriceSelectArgsDto
  ) {
    return await this.repository.create({ ...query, data });
  }

  @FindAll({
    responseType: () => ReadPriceDto,
    queryDto: () => PriceFindManyArgsDto,
  })
  findAll(@Query() query: PriceFindManyArgsDto) {
    return this.repository.findMany(query);
  }

  @FindOneById({
    responseType: () => ReadPriceDto,
    queryDto: () => PriceFindOneArgsDto,
  })
  findOneById(@ParamId() id: number, @Query() query: PriceFindOneArgsDto) {
    return this.repository.findUnique({
      ...query,
      where: { ...query.where, id },
    });
  }

  @UpdateOneById({
    responseType: () => ReadPriceDto,
    updateDto: () => UpdatePriceDto,
    queryDto: () => PriceFindManyArgsDto,
  })
  updateOneById(
    @ParamId() id: number,
    @Body() data: UpdatePriceDto,
    @Query() query: PriceFindOneArgsDto
  ) {
    return this.repository.update({
      ...query,
      where: { ...query.where, id },
      data,
    });
  }

  @DeleteOneById({
    responseType: () => ReadPriceDto,
    queryDto: () => PriceFindOneArgsDto,
  })
  deleteOneById(@ParamId() id: number, @Query() query: PriceFindOneArgsDto) {
    return this.repository.delete({
      ...query,
      where: { ...query.where, id },
    });
  }
}
