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
import type { PriceLevel } from '@prisma/client';
import { Prisma as P } from '@prisma/client';

@Model()
export class PriceLevelWhereDto implements P.PriceLevelWhereInput {
  @QryObj(() => PriceLevelWhereDto) AND: PriceLevelWhereDto[];
  @QryObj(() => PriceLevelWhereDto) OR: PriceLevelWhereDto[];
  @QryObj(() => PriceLevelWhereDto) NOT: PriceLevelWhereDto[];
  @QryNum() id: IntFilter;
  @QryDate() createdAt: DateTimeFilter;
  @QryDate() updatedAt: DateTimeFilter;
  @QryDate() deletedAt: DateTimeFilter;
  @QryStr() name: StringFilter;
  @QryStr() description: StringFilter;
  @QryNum() categoryId: IntFilter;
}

@Model()
export class PriceLevelWhereUniqueDto implements PriceLevel {
  @Prop({ type: 'integer' }) id: number;
  @Prop({ type: 'string', format: 'date' }) createdAt: Date;
  @Prop({ type: 'string', format: 'date' }) updatedAt: Date;
  @Prop({ type: 'string', format: 'date' }) deletedAt: Date;
  @Prop({ type: 'string' }) name: string;
  @Prop({ type: 'string' }) taxrate: P.Decimal;
}

@Model()
export class PriceLevelSelectDto implements P.PriceLevelSelect {
  @QrySelect() id?: boolean;
  @QrySelect() createdAt?: boolean;
  @QrySelect() updatedAt?: boolean;
  @QrySelect() deletedAt?: boolean;
  @QrySelect() name?: boolean;
  @QrySelect() taxrate?: boolean;
}

@Model()
export class PriceLevelOrderDto
  implements P.PriceLevelOrderByWithRelationInput
{
  @QryOrd() id?: OrderDirection;
  @QryOrd() createdAt?: OrderDirection;
  @QryOrd() updatedAt?: OrderDirection;
  @QryOrd() deletedAt?: OrderDirection;
  @QryOrd() name?: OrderDirection;
  @QryOrd() taxrate?: OrderDirection;
}

@Model()
export class PriceLevelSelectArgsDto {
  @QryObj(() => PriceLevelSelectDto) select?: PriceLevelSelectDto;
  @QryObj(() => PriceLevelSelectDto) omit?: PriceLevelSelectDto;
}

@Model()
export class PriceLevelFindOneArgsDto extends PriceLevelSelectArgsDto {
  @QryObj(() => PriceLevelWhereUniqueDto) where: PriceLevelWhereUniqueDto;
}

@Model()
export class PriceLevelFindManyArgsDto
  extends PriceLevelSelectArgsDto
  implements P.PriceLevelFindManyArgs
{
  @QryTake() take: number;
  @QrySkip() skip: number;
  @QryObj(() => PriceLevelOrderDto) orderBy?: PriceLevelOrderDto;
  @QryObj(() => PriceLevelWhereDto) where?: PriceLevelWhereDto;
  @QryObj(() => PriceLevelWhereDto) cursor?: P.PriceLevelWhereUniqueInput;
  @QryEnum(P.PriceLevelScalarFieldEnum)
  distinct?: P.PriceLevelScalarFieldEnum[];
}
