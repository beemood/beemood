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
import type { Email } from '@prisma/client';
import { Prisma as P } from '@prisma/client';

@Model()
export class EmailWhereDto extends BaseWhereDto implements P.EmailWhereInput {
  @QryStr() email?: WhereStringDto;
  @QryNum() contactId?: WhereNumberDto;
}

@Model()
export class EmailWhereUniqueDto
  extends BaseUniqueWhereDto
  implements Partial<Email>
{
  @Prop({ type: 'string' }) email?: string;
  @Prop({ type: 'integer' }) contactId?: number;
}

@Model()
export class EmailSelectDto extends BaseSelectDto implements P.EmailSelect {
  @QrySelect() email?: boolean;
  @QrySelect() contactId?: boolean;
}

@Model()
export class EmailOrderDto
  extends BaseOrderDto
  implements P.EmailOrderByWithRelationInput
{
  @QryOrd() email?: OrderDirection;
  @QryOrd() contactId?: OrderDirection;
}

@Model()
export class EmailSelectArgsDto {
  @QryObj(() => EmailSelectDto) select?: EmailSelectDto;
  @QryObj(() => EmailSelectDto) omit?: EmailSelectDto;
}

@Model()
export class EmailFindOneArgsDto extends EmailSelectArgsDto {
  @QryObj(() => EmailWhereUniqueDto) where: EmailWhereUniqueDto;
}

@Model()
export class EmailFindManyArgsDto
  extends EmailSelectArgsDto
  implements P.EmailFindManyArgs
{
  @QryTake() take: number;
  @QrySkip() skip: number;
  @QryObj(() => EmailOrderDto) orderBy?: EmailOrderDto;
  @QryObj(() => EmailWhereDto) where?: EmailWhereDto;
  @QryObj(() => EmailWhereDto) cursor?: P.EmailWhereUniqueInput;
  @QryEnum(P.EmailScalarFieldEnum)
  distinct?: P.EmailScalarFieldEnum[];
}
