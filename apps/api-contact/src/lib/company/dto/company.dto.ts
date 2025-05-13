import { BaseReadDto, Model, Prop } from '@bmod/property';
import { PartialType } from '@nestjs/swagger';
import type { Company, Prisma as P } from '@prisma/client';

@Model()
export class ReadCompanyDto extends BaseReadDto implements Company {
  @Prop({ type: 'string' }) name: string;
  @Prop({ type: 'integer' }) industryId: number;
}

@Model()
export class CreateCompanyDto implements P.CompanyUncheckedCreateInput {
  @Prop({ type: 'string', required: true, unique: true, maxLength: 100 })
  name: string;

  @Prop({ type: 'integer' }) industryId: number;
}

@Model()
export class UpdateCompanyDto extends PartialType(CreateCompanyDto) {}
