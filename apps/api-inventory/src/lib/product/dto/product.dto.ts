/* eslint-disable @nx/enforce-module-boundaries */

import { Model, Property } from '@bmod/property';
import { PartialType } from '@nestjs/swagger';
import type { Prisma, Product } from '@prisma/client';

@Model()
export class ReadProductDto implements Partial<Product> {
  @Property({ type: 'integer' }) id?: number;
  @Property({ type: 'string' }) createdAt?: Date;
  @Property({ type: 'string' }) updatedAt?: Date;
  @Property({ type: 'string' }) deletedAt?: Date;
  @Property({ type: 'string' }) name?: string;
  @Property({ type: 'string' }) description?: string;
}

@Model()
export class CreateProductDto implements Prisma.ProductCreateInput {
  @Property({ type: 'string' }) name: string;
  @Property({ type: 'string' }) description?: string;
}

@Model()
export class UpdateProductDto extends PartialType(CreateProductDto) {}
