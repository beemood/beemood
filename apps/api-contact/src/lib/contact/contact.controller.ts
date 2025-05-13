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
  CreateContactDto as CreateDto,
  ReadContactDto as ReadDto,
  UpdateContactDto as UpdateDto,
} from './dto/contact.dto.js';
import {
  ContactFindManyArgsDto as FindManyDto,
  ContactFindOneArgsDto as FindOneDto,
  ContactSelectArgsDto as SelectDto,
} from './dto/query-contact.dto.js';

@ResourceController('contact', [
  CreateDto,
  UpdateDto,
  SelectDto,
  FindOneDto,
  FindManyDto,
])
export class ContactController {
  constructor(
    @InjectRepo('contact') protected readonly repo: P.ContactDelegate
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
