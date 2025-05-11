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
  CreateQuantityDto,
  ReadQuantityDto,
  UpdateQuantityDto,
} from './dto/quantity.dto.js';
import {
  QuantityFindManyArgsDto,
  QuantityFindOneArgsDto,
  QuantitySelectArgsDto,
} from './dto/query-quantity.dto.js';

@ResourceController('quantities')
export class QuantityController {
  constructor(
    @InjectRepository('quantity')
    protected readonly repository: Prisma.QuantityDelegate
  ) {}

  @CreateOne({
    responseType: () => ReadQuantityDto,
    queryDto: () => QuantitySelectArgsDto,
    createDto: () => CreateQuantityDto,
  })
  async createOne(
    @Body() data: CreateQuantityDto,
    @Query() query: QuantitySelectArgsDto
  ) {
    return await this.repository.create({ ...query, data });
  }

  @FindAll({
    responseType: () => ReadQuantityDto,
    queryDto: () => QuantityFindManyArgsDto,
  })
  findAll(@Query() query: QuantityFindManyArgsDto) {
    return this.repository.findMany(query);
  }

  @FindOneById({
    responseType: () => ReadQuantityDto,
    queryDto: () => QuantityFindOneArgsDto,
  })
  findOneById(@ParamId() id: number, @Query() query: QuantityFindOneArgsDto) {
    return this.repository.findFirst({
      ...query,
      where: { ...query.where, id },
    });
  }

  @UpdateOneById({
    responseType: () => ReadQuantityDto,
    updateDto: () => UpdateQuantityDto,
    queryDto: () => QuantityFindManyArgsDto,
  })
  updateOneById(
    @ParamId() id: number,
    @Body() data: UpdateQuantityDto,
    @Query() query: QuantityFindOneArgsDto
  ) {
    return this.repository.update({
      ...query,
      where: { ...query.where, id },
      data,
    });
  }

  @DeleteOneById({
    responseType: () => ReadQuantityDto,
    queryDto: () => QuantityFindOneArgsDto,
  })
  deleteOneById(@ParamId() id: number, @Query() query: QuantityFindOneArgsDto) {
    return this.repository.delete({
      ...query,
      where: { ...query.where, id },
    });
  }
}
