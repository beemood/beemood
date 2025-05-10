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
import type { Store } from '@prisma/client';
import { Prisma as P } from '@prisma/client';

@Model()
export class StoreWhereDto implements P.StoreWhereInput {
  @QryObj(() => StoreWhereDto) AND: StoreWhereDto[];
  @QryObj(() => StoreWhereDto) OR: StoreWhereDto[];
  @QryObj(() => StoreWhereDto) NOT: StoreWhereDto[];
  @QryNum() id: IntFilter;
  @QryDate() createdAt: DateTimeFilter;
  @QryDate() updatedAt: DateTimeFilter;
  @QryDate() deletedAt: DateTimeFilter;
  @QryStr() name: StringFilter;
  @QryStr() description: StringFilter;
}

@Model()
export class StoreWhereUniqueDto implements Store {
  @Prop({ type: 'integer' }) id: number;
  @Prop({ type: 'string', format: 'date' }) createdAt: Date;
  @Prop({ type: 'string', format: 'date' }) updatedAt: Date;
  @Prop({ type: 'string', format: 'date' }) deletedAt: Date;
  @Prop({ type: 'string' }) name: string;
  @Prop({ type: 'integer' }) priceLevelId: number;
}

@Model()
export class StoreSelectDto implements P.StoreSelect {
  @QrySelect() id?: boolean;
  @QrySelect() createdAt?: boolean;
  @QrySelect() updatedAt?: boolean;
  @QrySelect() deletedAt?: boolean;
  @QrySelect() name?: boolean;
  @QrySelect() priceLevelId?: boolean;

  @QrySelect() PriceLevel: boolean;
  @QrySelect() Quantity: boolean;
  @QrySelect() SerialNumber: boolean;
  @QrySelect() Cart: boolean;
}

@Model()
export class StoreOrderDto implements P.StoreOrderByWithRelationInput {
  @QryOrd() id?: OrderDirection;
  @QryOrd() createdAt?: OrderDirection;
  @QryOrd() updatedAt?: OrderDirection;
  @QryOrd() deletedAt?: OrderDirection;
  @QryOrd() name?: OrderDirection;
  @QryOrd() priceLevelId?: P.SortOrder | undefined;
}

@Model()
export class StoreSelectArgsDto {
  @QryObj(() => StoreSelectDto) select?: StoreSelectDto;
  @QryObj(() => StoreSelectDto) omit?: StoreSelectDto;
}

@Model()
export class StoreFindOneArgsDto extends StoreSelectArgsDto {
  @QryObj(() => StoreWhereUniqueDto) where: StoreWhereUniqueDto;
}

@Model()
export class StoreFindManyArgsDto
  extends StoreSelectArgsDto
  implements P.StoreFindManyArgs
{
  @QryTake() take: number;
  @QrySkip() skip: number;
  @QryObj(() => StoreOrderDto) orderBy?: StoreOrderDto;
  @QryObj(() => StoreWhereDto) where?: StoreWhereDto;
  @QryObj(() => StoreWhereDto) cursor?: P.StoreWhereUniqueInput;
  @QryEnum(P.StoreScalarFieldEnum) distinct?: P.StoreScalarFieldEnum[];
}
