import { AutoResourceController, ParamId } from '@beemood/nestjs';
import { InjectRepository } from '@beemood/nestjs-prisma';
import {
  CreateSampleDto,
  Prisma,
  ReadSampleDto,
  UpdateSampleDto,
} from '@beemood/sample-db';
import { Body } from '@nestjs/common';

@AutoResourceController({
  createDto: CreateSampleDto,
  updateDto: UpdateSampleDto,
  readDto: ReadSampleDto,
})
export class SampleController {
  constructor(
    @InjectRepository(Prisma.ModelName.Sample)
    protected readonly repo: Prisma.SampleDelegate
  ) {}

  findAll() {
    return this.repo.findMany({});
  }

  findOneById(@ParamId() id: number) {
    return this.repo.findFirstOrThrow({ where: { id } });
  }

  create(@Body() data: Prisma.SampleCreateInput) {
    return this.repo.create({ data });
  }

  update(@ParamId() id: number, @Body() data: UpdateSampleDto) {
    return this.repo.update({ where: { id }, data });
  }

  delete(@ParamId() id: number) {
    return this.repo.delete({ where: { id } });
  }
}
