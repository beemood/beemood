/* eslint-disable @nx/enforce-module-boundaries */

import { Model, Prop } from '@bmod/property';
import { PartialType } from '@nestjs/swagger';
import type { Prisma, Product } from '@prisma/client';

@Model()
export class ReadProductDto implements Partial<Product> {
  @Prop({ type: 'integer' }) id?: number;
  @Prop({ type: 'string' }) createdAt?: Date;
  @Prop({ type: 'string' }) updatedAt?: Date;
  @Prop({ type: 'string' }) deletedAt?: Date;
  @Prop({ type: 'string' }) name?: string;
  @Prop({ type: 'string' }) description?: string;
}

@Model()
export class CreateProductDto implements Prisma.ProductCreateInput {
  @Prop({ type: 'string' }) name: string;
  @Prop({ type: 'string' }) description?: string;
}

@Model()
export class UpdateProductDto extends PartialType(CreateProductDto) {}
