/* eslint-disable @nx/enforce-module-boundaries */
import {
  Model,
  OrderProperty,
  Property,
  SelectProperty,
  WhereDateProperty,
  WhereDtoProperty,
  WhereNumberProperty,
  WhereStringProperty,
} from '@bmod/property';
import type {
  DateTimeFilter,
  IntFilter,
  OrderDirection,
  StringFilter,
} from '@bmod/types';
import { ApiProperty } from '@nestjs/swagger';
import type { Product } from '@prisma/client';
import { Prisma } from '@prisma/client';

@Model()
export class ProductWhereDto implements Required<Prisma.ProductWhereInput> {
  @WhereDtoProperty() AND: ProductWhereDto[];
  @WhereDtoProperty() OR: ProductWhereDto[];
  @WhereDtoProperty() NOT: ProductWhereDto[];

  @WhereNumberProperty() id: IntFilter;

  @WhereDateProperty() createdAt: DateTimeFilter;
  @WhereDateProperty() updatedAt: DateTimeFilter;
  @WhereDateProperty() deletedAt: DateTimeFilter;

  @WhereStringProperty() name: StringFilter;
  @WhereStringProperty() description: StringFilter;
}

@Model()
export class ProductWhereUniqueDto implements Product {
  @Property({ type: 'integer' }) id: number;

  @Property({ type: 'string' }) createdAt: Date;
  @Property({ type: 'string' }) updatedAt: Date;
  @Property({ type: 'string' }) deletedAt: Date;

  @Property({ type: 'string' }) name: string;
  @Property({ type: 'string' }) description: string;
}

@Model()
export class ProductSelectDto implements Prisma.ProductSelect {
  @SelectProperty() id?: boolean;
  @SelectProperty() name?: boolean;
  @SelectProperty() description?: boolean;
  @SelectProperty() createdAt?: boolean;
  @SelectProperty() updatedAt?: boolean;
  @SelectProperty() deletedAt?: boolean;
}

@Model()
export class ProductOrderDto
  implements Required<Prisma.ProductOrderByWithRelationInput>
{
  @OrderProperty() id: OrderDirection;
  @OrderProperty() createdAt: OrderDirection;
  @OrderProperty() updatedAt: OrderDirection;
  @OrderProperty() deletedAt: OrderDirection;
  @OrderProperty() name: OrderDirection;
  @OrderProperty() description: OrderDirection;
}

@Model()
export class ProductSelectArgsDto {
  @ApiProperty({ type: ProductSelectDto })
  select?: ProductSelectDto;

  @Property({ type: 'object', target: () => ProductSelectDto })
  omit?: ProductSelectDto;
}

@Model()
export class ProductFindOneArgsDto extends ProductSelectArgsDto {
  @Property({
    type: 'object',
    required: true,
    target: () => ProductWhereUniqueDto,
  })
  where: ProductWhereUniqueDto;
}

@Model()
export class ProductFindManyArgsDto
  extends ProductSelectArgsDto
  implements Prisma.ProductFindManyArgs
{
  @Property({ type: 'object', target: () => ProductOrderDto })
  orderBy?: ProductOrderDto;

  @Property({ type: 'object', target: () => ProductWhereDto })
  cursor?: Prisma.ProductWhereUniqueInput;

  @Property({ type: 'integer', minimum: 0, defaultValue: 20, maximum: 10000 })
  take: number;

  @Property({ type: 'integer', minimum: 0, defaultValue: 0 })
  skip: number;

  @Property({
    type: 'array',
    items: {
      type: 'string',
      isIn: Object.values(Prisma.ProductScalarFieldEnum),
    },
  })
  distinct?: Prisma.ProductScalarFieldEnum[];

  @Property({ type: 'object', target: () => ProductWhereDto })
  where?: ProductWhereDto;
}
