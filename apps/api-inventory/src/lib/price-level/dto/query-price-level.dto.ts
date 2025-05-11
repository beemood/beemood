/* eslint-disable @nx/enforce-module-boundaries */
import type { WhereNumberDto, WhereStringDto } from '@bmod/property';
import {
  BaseOrderDto,
  BaseSelectDto,
  BaseUniqueWhereDto,
  BaseWhereDto,
  Model,
  Prop,
  QryEnum,
  QryNum,
  QryObj,
  QryOrd,
  QrySelect,
  QrySkip,
  QryStr,
  QryTake,
} from '@bmod/property';
import type { OrderDirection } from '@bmod/types';
import type { PriceLevel } from '@prisma/client';
import { Prisma as P } from '@prisma/client';

@Model()
export class PriceLevelWhereDto
  extends BaseWhereDto
  implements P.PriceLevelWhereInput
{
  @QryStr() name?: WhereStringDto;
  @QryNum() taxrate?: WhereNumberDto;
}

@Model()
export class PriceLevelWhereUniqueDto
  extends BaseUniqueWhereDto
  implements Partial<PriceLevel>
{
  @Prop({ type: 'string' }) name?: string;
  @Prop({ type: 'number' }) taxrate?: P.Decimal;
}

@Model()
export class PriceLevelSelectDto
  extends BaseSelectDto
  implements P.PriceLevelSelect
{
  @QrySelect() name?: boolean;
  @QrySelect() taxrate?: boolean;
}

@Model()
export class PriceLevelOrderDto
  extends BaseOrderDto
  implements P.PriceLevelOrderByWithRelationInput
{
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
