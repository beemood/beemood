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
  CreateJobTitleDto as CreateDto,
  ReadJobTitleDto as ReadDto,
  UpdateJobTitleDto as UpdateDto,
} from './dto/job-title.dto.js';
import {
  JobTitleFindManyArgsDto as FindManyDto,
  JobTitleFindOneArgsDto as FindOneDto,
  JobTitleSelectArgsDto as SelectDto,
} from './dto/query-job-title.dto.js';

@ResourceController('job-title', [
  CreateDto,
  UpdateDto,
  SelectDto,
  FindOneDto,
  FindManyDto,
])
export class JobTitleController {
  constructor(
    @InjectRepo('jobTitle') protected readonly repo: P.JobTitleDelegate
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
