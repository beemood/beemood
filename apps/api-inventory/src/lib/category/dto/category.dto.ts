import { BaseReadDto, Model, Prop } from '@bmod/property';
import { PartialType } from '@nestjs/swagger';
import type { Category, Prisma as P } from '@prisma/client';

@Model()
export class ReadCategoryDto extends BaseReadDto implements Category {
  @Prop({ type: 'string' }) name: string;
}

@Model()
export class CreateCategoryDto implements P.CategoryCreateInput {
  @Prop({ type: 'string', required: true, unique: true, maxLength: 100 })
  name: string;
}

@Model()
export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}
