import type { WhereNumberDto, WhereStringDto } from '@bmod/property';
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
import type { Phone } from '@prisma/client';
import { Prisma as P } from '@prisma/client';

@Model()
export class PhoneWhereDto extends BaseWhereDto implements P.PhoneWhereInput {
  @QryStr() phone: WhereStringDto;
  @QryStr() contactId: WhereNumberDto;
}

@Model()
export class PhoneWhereUniqueDto
  extends BaseUniqueWhereDto
  implements Partial<Phone>
{
  @Prop({ type: 'string' }) phone?: string;
  @Prop({ type: 'integer' }) contactId?: number;
}

@Model()
export class PhoneSelectDto extends BaseSelectDto implements P.PhoneSelect {
  @QrySelect() phone?: boolean;
  @QrySelect() contactId?: boolean;
}

@Model()
export class PhoneOrderDto
  extends BaseOrderDto
  implements P.PhoneOrderByWithRelationInput
{
  @QryOrd() phone?: OrderDirection;
  @QryOrd() contactId?: OrderDirection;
}

@Model()
export class PhoneSelectArgsDto {
  @QryObj(() => PhoneSelectDto) select?: PhoneSelectDto;
  @QryObj(() => PhoneSelectDto) omit?: PhoneSelectDto;
}

@Model()
export class PhoneFindOneArgsDto extends PhoneSelectArgsDto {
  @QryObj(() => PhoneWhereUniqueDto) where: PhoneWhereUniqueDto;
}

@Model()
export class PhoneFindManyArgsDto
  extends PhoneSelectArgsDto
  implements P.PhoneFindManyArgs
{
  @QryTake() take: number;
  @QrySkip() skip: number;
  @QryObj(() => PhoneOrderDto) orderBy?: PhoneOrderDto;
  @QryObj(() => PhoneWhereDto) where?: PhoneWhereDto;
  @QryObj(() => PhoneWhereDto) cursor?: P.PhoneWhereUniqueInput;
  @QryEnum(P.PhoneScalarFieldEnum)
  distinct?: P.PhoneScalarFieldEnum[];
}
