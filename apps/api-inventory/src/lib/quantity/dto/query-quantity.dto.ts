/* eslint-disable @nx/enforce-module-boundaries */
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
  QrySelect,
  QrySkip, QryTake
} from '@bmod/property';
import type { OrderDirection } from '@bmod/types';
import type { Quantity } from '@prisma/client';
import { Prisma as P } from '@prisma/client';

@Model()
export class QuantityWhereDto
  extends BaseWhereDto
  implements P.QuantityWhereInput
{
  @QryNum() quantity?: WhereNumberDto;
  @QryNum() minumumQuantity?: WhereNumberDto;
  @QryNum() productVariantId?: WhereNumberDto;
  @QryNum() storeId?: WhereNumberDto;
}

@Model()
export class QuantityWhereUniqueDto
  extends BaseUniqueWhereDto
  implements Partial<Quantity>
{
  @Prop({ type: 'integer' }) quantity?: number;
  @Prop({ type: 'integer' }) minumumQuantity?: number;
  @Prop({ type: 'integer' }) productVariantId?: number;
  @Prop({ type: 'integer' }) storeId?: number;
}

@Model()
export class QuantitySelectDto
  extends BaseSelectDto
  implements P.QuantitySelect
{
  @QrySelect() quantity?: boolean;
  @QrySelect() minumumQuantity?: boolean;
  @QrySelect() productVariantId?: boolean;
  @QrySelect() storeId?: boolean;
}

@Model()
export class QuantityOrderDto
  extends BaseOrderDto
  implements P.QuantityOrderByWithRelationInput
{
  @QryOrd() quantity?: OrderDirection;
  @QryOrd() minumumQuantity?: OrderDirection;
  @QryOrd() productVariantId?: OrderDirection;
  @QryOrd() storeId?: OrderDirection;
}

@Model()
export class QuantitySelectArgsDto {
  @QryObj(() => QuantitySelectDto) select?: QuantitySelectDto;
  @QryObj(() => QuantitySelectDto) omit?: QuantitySelectDto;
}

@Model()
export class QuantityFindOneArgsDto extends QuantitySelectArgsDto {
  @QryObj(() => QuantityWhereUniqueDto) where: QuantityWhereUniqueDto;
}

@Model()
export class QuantityFindManyArgsDto
  extends QuantitySelectArgsDto
  implements P.QuantityFindManyArgs
{
  @QryTake() take: number;
  @QrySkip() skip: number;
  @QryObj(() => QuantityOrderDto) orderBy?: QuantityOrderDto;
  @QryObj(() => QuantityWhereDto) where?: QuantityWhereDto;
  @QryObj(() => QuantityWhereDto) cursor?: P.QuantityWhereUniqueInput;
  @QryEnum(P.QuantityScalarFieldEnum)
  distinct?: P.QuantityScalarFieldEnum[];
}
