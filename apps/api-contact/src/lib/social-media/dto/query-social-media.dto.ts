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
import type { SocialMedia } from '@prisma/client';
import { Prisma as P } from '@prisma/client';

@Model()
export class SocialMediaWhereDto
  extends BaseWhereDto
  implements P.SocialMediaWhereInput
{
  @QryStr() url?: WhereStringDto;
  @QryNum() contactId?: WhereNumberDto;
}

@Model()
export class SocialMediaWhereUniqueDto
  extends BaseUniqueWhereDto
  implements Partial<SocialMedia>
{
  @Prop({ type: 'string' }) url?: string;
  @Prop({ type: 'integer' }) contactId?: number;
}

@Model()
export class SocialMediaSelectDto extends BaseSelectDto implements P.SocialMediaSelect {
  @QrySelect() url?: boolean;
  @QrySelect() contactId?: boolean;
}

@Model()
export class SocialMediaOrderDto
  extends BaseOrderDto
  implements P.SocialMediaOrderByWithRelationInput
{
  @QryOrd() url?: OrderDirection;
  @QryOrd() contactId?: OrderDirection;
}

@Model()
export class SocialMediaSelectArgsDto {
  @QryObj(() => SocialMediaSelectDto) select?: SocialMediaSelectDto;
  @QryObj(() => SocialMediaSelectDto) omit?: SocialMediaSelectDto;
}

@Model()
export class SocialMediaFindOneArgsDto extends SocialMediaSelectArgsDto {
  @QryObj(() => SocialMediaWhereUniqueDto) where: SocialMediaWhereUniqueDto;
}

@Model()
export class SocialMediaFindManyArgsDto
  extends SocialMediaSelectArgsDto
  implements P.SocialMediaFindManyArgs
{
  @QryTake() take: number;
  @QrySkip() skip: number;
  @QryObj(() => SocialMediaOrderDto) orderBy?: SocialMediaOrderDto;
  @QryObj(() => SocialMediaWhereDto) where?: SocialMediaWhereDto;
  @QryObj(() => SocialMediaWhereDto) cursor?: P.SocialMediaWhereUniqueInput;
  @QryEnum(P.SocialMediaScalarFieldEnum)
  distinct?: P.SocialMediaScalarFieldEnum[];
}
