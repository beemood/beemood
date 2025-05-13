import type { WhereStringDto } from '@bmod/property';
import {
  BaseOrderDto,
  BaseSelectDto,
  BaseUniqueWhereDto,
  BaseWhereDto,
  Model,
  Prop,
  QryEnum,
  QryObj,
  QryOrd,
  QrySelect,
  QrySkip,
  QryStr,
  QryTake,
} from '@bmod/property';
import type { OrderDirection } from '@bmod/types';
import type { Industry } from '@prisma/client';
import { Prisma as P } from '@prisma/client';

@Model()
export class IndustryWhereDto
  extends BaseWhereDto
  implements P.IndustryWhereInput
{
  @QryStr() name: WhereStringDto;
}

@Model()
export class IndustryWhereUniqueDto
  extends BaseUniqueWhereDto
  implements Partial<Industry>
{
  @Prop({ type: 'string' }) name?: string;
}

@Model()
export class IndustrySelectDto
  extends BaseSelectDto
  implements P.IndustrySelect
{
  @QrySelect() name?: boolean;
}

@Model()
export class IndustryOrderDto
  extends BaseOrderDto
  implements P.IndustryOrderByWithRelationInput
{
  @QryOrd() name?: OrderDirection;
}

@Model()
export class IndustrySelectArgsDto {
  @QryObj(() => IndustrySelectDto) select?: IndustrySelectDto;
  @QryObj(() => IndustrySelectDto) omit?: IndustrySelectDto;
}

@Model()
export class IndustryFindOneArgsDto extends IndustrySelectArgsDto {
  @QryObj(() => IndustryWhereUniqueDto) where: IndustryWhereUniqueDto;
}

@Model()
export class IndustryFindManyArgsDto
  extends IndustrySelectArgsDto
  implements P.IndustryFindManyArgs
{
  @QryTake() take: number;
  @QrySkip() skip: number;
  @QryObj(() => IndustryOrderDto) orderBy?: IndustryOrderDto;
  @QryObj(() => IndustryWhereDto) where?: IndustryWhereDto;
  @QryObj(() => IndustryWhereDto) cursor?: P.IndustryWhereUniqueInput;
  @QryEnum(P.IndustryScalarFieldEnum)
  distinct?: P.IndustryScalarFieldEnum[];
}
