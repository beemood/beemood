/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @nx/enforce-module-boundaries */
import { Model, Property } from '@bmod/property';
import type { Prisma } from '@prisma/client';

@Model()
export class ProductWhereDto implements Required<Prisma.ProductWhereInput> {
  @Property({
    type: 'array',
    items: { type: 'object', target: () => ProductWhereDto },
  })
  AND: ProductWhereDto[];

  @Property({
    type: 'array',
    items: { type: 'object', target: () => ProductWhereDto },
  })
  OR: ProductWhereDto[];

  @Property({
    type: 'array',
    items: { type: 'object', target: () => ProductWhereDto },
  })
  NOT: ProductWhereDto[];

  @Property({ type: 'object', target: () => class Filter {} }) id: any;
  @Property({ type: 'object', target: () => class Filter {} }) createdAt: any;
  @Property({ type: 'object', target: () => class Filter {} }) updatedAt: any;
  @Property({ type: 'object', target: () => class Filter {} }) deletedAt: any;
  @Property({ type: 'object', target: () => class Filter {} }) name: string;
  @Property({ type: 'object', target: () => class Filter {} })
  description: string;
}

@Model()
export class ProductSelectDto implements Prisma.ProductSelect {
  @Property({ type: 'boolean', transform: true }) id?: boolean;
  @Property({ type: 'boolean', transform: true }) name?: boolean;
  @Property({ type: 'boolean', transform: true }) description?: boolean;
  @Property({ type: 'boolean', transform: true }) createdAt?: boolean;
  @Property({ type: 'boolean', transform: true }) updatedAt?: boolean;
  @Property({ type: 'boolean', transform: true }) deletedAt?: boolean;
}

@Model()
export class ProductOrderDto
  implements Required<Prisma.ProductOrderByWithRelationInput>
{
  @Property({ type: 'string' }) id: Prisma.SortOrder;
  @Property({ type: 'string' }) createdAt: Prisma.SortOrder;
  @Property({ type: 'string' }) updatedAt: Prisma.SortOrder;
  @Property({ type: 'string' }) deletedAt: Prisma.SortOrder;
  @Property({ type: 'string' }) name: Prisma.SortOrder;
  @Property({ type: 'string' }) description: Prisma.SortOrder;
}

@Model()
export class ProductFindManyArgsDto implements Prisma.ProductFindManyArgs {
  @Property({ type: 'object', target: () => ProductSelectDto })
  select?: ProductSelectDto;

  @Property({ type: 'object', target: () => ProductSelectDto })
  omit: ProductSelectDto;

  @Property({ type: 'object', target: () => ProductOrderDto })
  orderBy: ProductOrderDto;

  @Property({ type: 'object', target: () => ProductWhereDto })
  cursor: ProductWhereDto;

  @Property({ type: 'integer', minimum: 0 }) take: number;

  @Property({ type: 'integer', minimum: 0 }) skip: number;

  @Property({ type: 'array', items: { type: 'string' } })
  distinct: Prisma.ProductScalarFieldEnum[];

  @Property({ type: 'object', target: () => ProductWhereDto })
  where: ProductWhereDto;
}
