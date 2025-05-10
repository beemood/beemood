import {
  Model,
  Prop,
  QryDate,
  QryEnum,
  QryNum,
  QryObj,
  QryOrd,
  QrySelect,
  QrySkip,
  QryStr,
  QryTake,
} from '@bmod/property';
import type {
  DateTimeFilter,
  IntFilter,
  OrderDirection,
  StringFilter,
} from '@bmod/types';
import type { Product } from '@prisma/client';
import { Prisma as P } from '@prisma/client';

@Model()
export class ProductWhereDto implements P.ProductWhereInput {
  @QryObj(() => ProductWhereDto) AND: ProductWhereDto[];
  @QryObj(() => ProductWhereDto) OR: ProductWhereDto[];
  @QryObj(() => ProductWhereDto) NOT: ProductWhereDto[];

  @QryNum() id: IntFilter;

  @QryDate() createdAt: DateTimeFilter;
  @QryDate() updatedAt: DateTimeFilter;
  @QryDate() deletedAt: DateTimeFilter;

  @QryStr() name: StringFilter;
  @QryStr() barcode: StringFilter;
  @QryStr() description: StringFilter;

  @QryNum() categoryId: IntFilter;
}

@Model()
export class ProductWhereUniqueDto implements Product {
  @Prop({ type: 'integer' }) id: number;

  @Prop({ type: 'string', format: 'date' }) createdAt: Date;
  @Prop({ type: 'string', format: 'date' }) updatedAt: Date;
  @Prop({ type: 'string', format: 'date' }) deletedAt: Date;

  @Prop({ type: 'string' }) name: string;
  @Prop({ type: 'string' }) barcode: string;
  @Prop({ type: 'string' }) description: string;

  @Prop({ type: 'integer' }) categoryId: number;
}

@Model()
export class ProductSelectDto implements P.ProductSelect {
  @QrySelect() id?: boolean;

  @QrySelect() createdAt?: boolean;
  @QrySelect() updatedAt?: boolean;
  @QrySelect() deletedAt?: boolean;

  @QrySelect() name?: boolean;
  @QrySelect() barcode?: boolean;
  @QrySelect() description?: boolean;

  @QrySelect() categoryId?: boolean;
  @QrySelect() category?: boolean;
}

@Model()
export class ProductOrderDto implements P.ProductOrderByWithRelationInput {
  @QryOrd() id?: OrderDirection;

  @QryOrd() createdAt?: OrderDirection;
  @QryOrd() updatedAt?: OrderDirection;
  @QryOrd() deletedAt?: OrderDirection;

  @QryOrd() name?: OrderDirection;
  @QryOrd() barcode?: OrderDirection;
  @QryOrd() description?: OrderDirection;

  @QryOrd() categoryId?: OrderDirection;
}

@Model()
export class ProductSelectArgsDto {
  @QryObj(() => ProductSelectDto) select?: ProductSelectDto;
  @QryObj(() => ProductSelectDto) omit?: ProductSelectDto;
}

@Model()
export class ProductFindOneArgsDto extends ProductSelectArgsDto {
  @QryObj(() => ProductWhereUniqueDto) where: ProductWhereUniqueDto;
}

@Model()
export class ProductFindManyArgsDto
  extends ProductSelectArgsDto
  implements P.ProductFindManyArgs
{
  @QryTake() take: number;
  @QrySkip() skip: number;
  @QryObj(() => ProductOrderDto) orderBy?: ProductOrderDto;
  @QryObj(() => ProductWhereDto) where?: ProductWhereDto;
  @QryObj(() => ProductWhereDto) cursor?: P.ProductWhereUniqueInput;
  @QryEnum(P.ProductScalarFieldEnum) distinct?: P.ProductScalarFieldEnum[];
}
