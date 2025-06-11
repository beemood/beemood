import {
  Body,
  DeleteOneById,
  FindMany,
  FindOneById,
  ParamId,
  Query,
  ResourceController,
  SaveOne,
  UpdateOneById,
} from '@bmod/http';
import { InjectRepo } from '@bmod/prisma';
// eslint-disable-next-line @nx/enforce-module-boundaries
import type { Prisma } from '@beemood/hr-prisma';
import { CreateHrDto } from './dto/create-hr.dto.js';
import { UpdateHrDto } from './dto/update-hr.dto.js';
import { AdaptHrResponseDto } from './query-dto/adapt-hr-response.dto.js';
import { FindManyHrDto } from './query-dto/find-many-hr.dto.js';

@ResourceController('hr')
export class HrController {
  constructor(@InjectRepo('hr') protected readonly repo: Prisma.HrDelegate) {}

  @FindMany()
  async findManyHr(@Query(() => FindManyHrDto) query: FindManyHrDto) {
    return await this.repo.findMany(query);
  }

  @FindOneById()
  findOneHrById(
    @ParamId() id: number,
    @Query(() => AdaptHrResponseDto) query: AdaptHrResponseDto
  ) {
    return this.repo.findUnique({ ...query, where: { id } });
  }

  @SaveOne()
  saveOneHr(
    @Body(() => CreateHrDto) data: CreateHrDto,
    @Query(() => AdaptHrResponseDto) query: AdaptHrResponseDto
  ) {
    return this.repo.create({ ...query, data });
  }

  @UpdateOneById()
  updateOneHrById(
    @ParamId() id: number,
    @Body(() => UpdateHrDto) data: UpdateHrDto,
    @Query(() => AdaptHrResponseDto) query: AdaptHrResponseDto
  ) {
    return this.repo.update({ ...query, where: { id }, data });
  }

  @DeleteOneById()
  deleteOneHrById(
    @ParamId() id: number,
    @Query(() => AdaptHrResponseDto) query: AdaptHrResponseDto
  ) {
    return this.repo.delete({ ...query, where: { id } });
  }
}
