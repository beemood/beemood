import type { WhereNumberDto } from '@bmod/property';
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
  QrySkip,
  QryTake,
} from '@bmod/property';
import type { OrderDirection } from '@bmod/types';
import type { Price } from '@prisma/client';
import { Prisma as P } from '@prisma/client';

@Model()
export class PriceWhereDto extends BaseWhereDto implements P.PriceWhereInput {
  @QryNum() cost: WhereNumberDto;
  @QryNum() price: WhereNumberDto;
  @QryNum() productVariantId: WhereNumberDto;
  @QryNum() priceLevelId: WhereNumberDto;
}

@Model()
export class PriceWhereUniqueDto
  extends BaseUniqueWhereDto
  implements Partial<Price>
{
  @Prop({ type: 'number' }) cost?: P.Decimal;
  @Prop({ type: 'number' }) price?: P.Decimal;
  @Prop({ type: 'integer' }) productVariantId?: number;
  @Prop({ type: 'integer' }) priceLevelId?: number;
}

@Model()
export class PriceSelectDto extends BaseSelectDto implements P.PriceSelect {
  @Prop({ type: 'boolean' }) cost?: boolean;
  @Prop({ type: 'boolean' }) price?: boolean;
  @Prop({ type: 'boolean' }) productVariantId?: boolean;
  @Prop({ type: 'boolean' }) priceLevelId?: boolean;
}

@Model()
export class PriceOrderDto
  extends BaseOrderDto
  implements P.PriceOrderByWithRelationInput
{
  @QryOrd() cost?: OrderDirection;
  @QryOrd() price?: OrderDirection;
  @QryOrd() productVariantId?: OrderDirection;
  @QryOrd() priceLevelId?: OrderDirection;
}

@Model()
export class PriceSelectArgsDto {
  @QryObj(() => PriceSelectDto) select?: PriceSelectDto;
  @QryObj(() => PriceSelectDto) omit?: PriceSelectDto;
}

@Model()
export class PriceFindOneArgsDto extends PriceSelectArgsDto {
  @QryObj(() => PriceWhereUniqueDto) where: PriceWhereUniqueDto;
}

@Model()
export class PriceFindManyArgsDto
  extends PriceSelectArgsDto
  implements P.PriceFindManyArgs
{
  @QryTake() take: number;
  @QrySkip() skip: number;
  @QryObj(() => PriceOrderDto) orderBy?: PriceOrderDto;
  @QryObj(() => PriceWhereDto) where?: PriceWhereDto;
  @QryObj(() => PriceWhereDto) cursor?: P.PriceWhereUniqueInput;
  @QryEnum(P.PriceScalarFieldEnum)
  distinct?: P.PriceScalarFieldEnum[];
}
