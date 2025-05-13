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
  CreateSocialMediaDto as CreateDto,
  ReadSocialMediaDto as ReadDto,
  UpdateSocialMediaDto as UpdateDto,
} from './dto/social-media.dto.js';
import {
  SocialMediaFindManyArgsDto as FindManyDto,
  SocialMediaFindOneArgsDto as FindOneDto,
  SocialMediaSelectArgsDto as SelectDto,
} from './dto/query-social-media.dto.js';

@ResourceController('social-media', [
  CreateDto,
  UpdateDto,
  SelectDto,
  FindOneDto,
  FindManyDto,
])
export class SocialMediaController {
  constructor(
    @InjectRepo('socialMedia') protected readonly repo: P.SocialMediaDelegate
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
