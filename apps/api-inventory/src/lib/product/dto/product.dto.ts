import { BaseReadDto, Model, Prop } from '@bmod/property';
import { PartialType } from '@nestjs/swagger';
import type { Prisma as P, Product } from '@prisma/client';

@Model()
export class ReadProductDto extends BaseReadDto implements Product {
  @Prop({ type: 'string' }) name: string;
  @Prop({ type: 'string' }) description: string;
  @Prop({ type: 'string' }) barcode: string;
  @Prop({ type: 'string' }) brand: string;

  @Prop({ type: 'integer' }) departmentId: number;
  @Prop({ type: 'integer' }) categoryId: number;
  @Prop({ type: 'integer' }) tagId: number;
}

@Model()
export class CreateProductDto implements P.ProductUncheckedCreateInput {
  @Prop({ type: 'string', required: true, maxLength: 100 }) name: string;
  @Prop({ type: 'string', maxLength: 400 }) description?: string;
  @Prop({ type: 'string', minLength: 8, maxLength: 13 }) barcode: string;
  @Prop({ type: 'string', maxLength: 100 }) brand?: string;
  @Prop({ type: 'integer', minimum: 1 }) categoryId?: number;
  @Prop({ type: 'integer', minimum: 1 }) departmentId?: number;
}

@Model()
export class UpdateProductDto extends PartialType(CreateProductDto) {}
