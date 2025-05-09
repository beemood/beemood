import { Model, Prop } from '@bmod/property';
import { PartialType } from '@nestjs/swagger';
import type { Category, Prisma as P } from '@prisma/client';

@Model()
export class ReadCategoryDto implements Partial<Category> {
  @Prop({ type: 'integer' }) id?: number;
  @Prop({ type: 'string' }) createdAt?: Date;
  @Prop({ type: 'string' }) updatedAt?: Date;
  @Prop({ type: 'string' }) deletedAt?: Date;
  @Prop({ type: 'string' }) name?: string;
}

@Model()
export class CreateCategoryDto implements P.CategoryCreateInput {
  @Prop({ type: 'string' }) name: string;
  @Prop({ type: 'string' }) description?: string;
}

@Model()
export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}
