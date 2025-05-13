import { BaseReadDto, Model, Prop } from '@bmod/property';
import { PartialType } from '@nestjs/swagger';
import type { Industry, Prisma as P } from '@prisma/client';

@Model()
export class ReadIndustryDto extends BaseReadDto implements Industry {
  @Prop({ type: 'string' }) name: string;
}

@Model()
export class CreateIndustryDto implements P.IndustryUncheckedCreateInput {
  @Prop({ type: 'string', required: true, unique: true, maxLength: 100 })
  name: string;
}

@Model()
export class UpdateIndustryDto extends PartialType(CreateIndustryDto) {}
