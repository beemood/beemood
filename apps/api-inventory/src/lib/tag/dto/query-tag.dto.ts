/* eslint-disable @nx/enforce-module-boundaries */
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
import type { Tag } from '@prisma/client';
import { Prisma as P } from '@prisma/client';

@Model()
export class TagWhereDto extends BaseWhereDto implements P.TagWhereInput {
  @QryStr() name: WhereStringDto;
}

@Model()
export class TagWhereUniqueDto
  extends BaseUniqueWhereDto
  implements Partial<Tag>
{
  @Prop({ type: 'string' }) name?: string;
}

@Model()
export class TagSelectDto extends BaseSelectDto implements P.TagSelect {
  @QrySelect() name?: boolean;
}

@Model()
export class TagOrderDto
  extends BaseOrderDto
  implements P.TagOrderByWithRelationInput
{
  @QryOrd() name?: OrderDirection;
}

@Model()
export class TagSelectArgsDto {
  @QryObj(() => TagSelectDto) select?: TagSelectDto;
  @QryObj(() => TagSelectDto) omit?: TagSelectDto;
}

@Model()
export class TagFindOneArgsDto extends TagSelectArgsDto {
  @QryObj(() => TagWhereUniqueDto) where: TagWhereUniqueDto;
}

@Model()
export class TagFindManyArgsDto
  extends TagSelectArgsDto
  implements P.TagFindManyArgs
{
  @QryTake() take: number;
  @QrySkip() skip: number;
  @QryObj(() => TagOrderDto) orderBy?: TagOrderDto;
  @QryObj(() => TagWhereDto) where?: TagWhereDto;
  @QryObj(() => TagWhereDto) cursor?: P.TagWhereUniqueInput;
  @QryEnum(P.TagScalarFieldEnum)
  distinct?: P.TagScalarFieldEnum[];
}
