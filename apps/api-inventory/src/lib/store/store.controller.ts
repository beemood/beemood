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
  CreateStoreDto,
  ReadStoreDto,
  UpdateStoreDto,
} from './dto/store.dto.js';
import {
  StoreFindManyArgsDto,
  StoreFindOneArgsDto,
  StoreSelectArgsDto,
} from './dto/query-store.dto.js';

@ResourceController('stores')
export class StoreController {
  constructor(
    @InjectRepository('store')
    protected readonly repository: Prisma.StoreDelegate
  ) {}

  @CreateOne({
    responseType: () => ReadStoreDto,
    queryDto: () => StoreSelectArgsDto,
    createDto: () => CreateStoreDto,
  })
  async createOne(
    @Body() data: CreateStoreDto,
    @Query() query: StoreSelectArgsDto
  ) {
    return await this.repository.create({ ...query, data });
  }

  @FindAll({
    responseType: () => ReadStoreDto,
    queryDto: () => StoreFindManyArgsDto,
  })
  findAll(@Query() query: StoreFindManyArgsDto) {
    return this.repository.findMany(query);
  }

  @FindOneById({
    responseType: () => ReadStoreDto,
    queryDto: () => StoreFindOneArgsDto,
  })
  findOneById(@ParamId() id: number, @Query() query: StoreFindOneArgsDto) {
    return this.repository.findUnique({
      ...query,
      where: { ...query.where, id },
    });
  }

  @UpdateOneById({
    responseType: () => ReadStoreDto,
    updateDto: () => UpdateStoreDto,
    queryDto: () => StoreFindManyArgsDto,
  })
  updateOneById(
    @ParamId() id: number,
    @Body() data: UpdateStoreDto,
    @Query() query: StoreFindOneArgsDto
  ) {
    return this.repository.update({
      ...query,
      where: { ...query.where, id },
      data,
    });
  }

  @DeleteOneById({
    responseType: () => ReadStoreDto,
    queryDto: () => StoreFindOneArgsDto,
  })
  deleteOneById(@ParamId() id: number, @Query() query: StoreFindOneArgsDto) {
    return this.repository.delete({
      ...query,
      where: { ...query.where, id },
    });
  }
}
