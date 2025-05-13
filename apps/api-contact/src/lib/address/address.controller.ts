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
  CreateAddressDto as CreateDto,
  ReadAddressDto as ReadDto,
  UpdateAddressDto as UpdateDto,
} from './dto/address.dto.js';
import {
  AddressFindManyArgsDto as FindManyDto,
  AddressFindOneArgsDto as FindOneDto,
  AddressSelectArgsDto as SelectDto,
} from './dto/query-address.dto.js';

@ResourceController('address', [
  CreateDto,
  UpdateDto,
  SelectDto,
  FindOneDto,
  FindManyDto,
])
export class AddressController {
  constructor(
    @InjectRepo('address') protected readonly repo: P.AddressDelegate
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
