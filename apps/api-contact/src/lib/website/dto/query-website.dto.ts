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
import type { Website } from '@prisma/client';
import { Prisma as P } from '@prisma/client';

@Model()
export class WebsiteWhereDto
  extends BaseWhereDto
  implements P.WebsiteWhereInput
{
  @QryStr() url?: WhereStringDto;
  @QryNum() contactId?: WhereNumberDto;
}

@Model()
export class WebsiteWhereUniqueDto
  extends BaseUniqueWhereDto
  implements Partial<Website>
{
  @Prop({ type: 'string' }) url?: string;
  @Prop({ type: 'integer' }) contactId?: number;
}

@Model()
export class WebsiteSelectDto extends BaseSelectDto implements P.WebsiteSelect {
  @QrySelect() url?: boolean;
  @QrySelect() contactId?: boolean;
}

@Model()
export class WebsiteOrderDto
  extends BaseOrderDto
  implements P.WebsiteOrderByWithRelationInput
{
  @QryOrd() url?: OrderDirection;
  @QryOrd() contactId?: OrderDirection;
}

@Model()
export class WebsiteSelectArgsDto {
  @QryObj(() => WebsiteSelectDto) select?: WebsiteSelectDto;
  @QryObj(() => WebsiteSelectDto) omit?: WebsiteSelectDto;
}

@Model()
export class WebsiteFindOneArgsDto extends WebsiteSelectArgsDto {
  @QryObj(() => WebsiteWhereUniqueDto) where: WebsiteWhereUniqueDto;
}

@Model()
export class WebsiteFindManyArgsDto
  extends WebsiteSelectArgsDto
  implements P.WebsiteFindManyArgs
{
  @QryTake() take: number;
  @QrySkip() skip: number;
  @QryObj(() => WebsiteOrderDto) orderBy?: WebsiteOrderDto;
  @QryObj(() => WebsiteWhereDto) where?: WebsiteWhereDto;
  @QryObj(() => WebsiteWhereDto) cursor?: P.WebsiteWhereUniqueInput;
  @QryEnum(P.WebsiteScalarFieldEnum)
  distinct?: P.WebsiteScalarFieldEnum[];
}
