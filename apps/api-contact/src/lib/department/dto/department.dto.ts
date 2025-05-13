import { BaseReadDto, Model, Prop } from '@bmod/property';
import { PartialType } from '@nestjs/swagger';
import type { Department, Prisma as P } from '@prisma/client';

@Model()
export class ReadDepartmentDto extends BaseReadDto implements Department {
  @Prop({ type: 'string' }) name: string;
}

@Model()
export class CreateDepartmentDto implements P.DepartmentUncheckedCreateInput {
  @Prop({ type: 'string', required: true, unique: true, maxLength: 100 })
  name: string;
}

@Model()
export class UpdateDepartmentDto extends PartialType(CreateDepartmentDto) {}
