import { BaseReadDto, Model, Prop } from '@bmod/property';
import { PartialType } from '@nestjs/swagger';
import type { JobTitle, Prisma as P } from '@prisma/client';

@Model()
export class ReadJobTitleDto extends BaseReadDto implements JobTitle {
  @Prop({ type: 'string' }) name: string;
}

@Model()
export class CreateJobTitleDto implements P.JobTitleUncheckedCreateInput {
  @Prop({ type: 'string', required: true, unique: true, maxLength: 100 })
  name: string;
}

@Model()
export class UpdateJobTitleDto extends PartialType(CreateJobTitleDto) {}
