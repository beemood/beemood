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
  QrySkip,
  QryStr,
  QryTake,
} from '@bmod/property';
import type { OrderDirection } from '@bmod/types';
import type { Address } from '@prisma/client';
import { Prisma as P } from '@prisma/client';

@Model()
export class AddressWhereDto
  extends BaseWhereDto
  implements P.AddressWhereInput
{
  @QryStr() country: WhereStringDto;
  @QryStr() street: WhereStringDto;
  @QryStr() city: WhereStringDto;
  @QryStr() state: WhereStringDto;
  @QryStr() zip: WhereStringDto;
  @QryStr() contactId: WhereNumberDto;
}

@Model()
export class AddressWhereUniqueDto
  extends BaseUniqueWhereDto
  implements Partial<Address>
{
  @Prop({ type: 'string' }) country: string;
  @Prop({ type: 'string' }) street: string;
  @Prop({ type: 'string' }) city: string;
  @Prop({ type: 'string' }) state: string;
  @Prop({ type: 'string' }) zip: string;
  @Prop({ type: 'integer' }) contactId: number;
}

@Model()
export class AddressSelectDto extends BaseSelectDto implements P.AddressSelect {
  @Prop({ type: 'boolean' }) country: boolean;
  @Prop({ type: 'boolean' }) street: boolean;
  @Prop({ type: 'boolean' }) city: boolean;
  @Prop({ type: 'boolean' }) state: boolean;
  @Prop({ type: 'boolean' }) zip: boolean;
  @Prop({ type: 'boolean' }) contactId: boolean;
}

@Model()
export class AddressOrderDto
  extends BaseOrderDto
  implements P.AddressOrderByWithRelationInput
{
  @QryOrd() country?: OrderDirection;
  @QryOrd() street?: OrderDirection;
  @QryOrd() city?: OrderDirection;
  @QryOrd() state?: OrderDirection;
  @QryOrd() zip?: OrderDirection;
  @QryOrd() contactId?: OrderDirection;
}

@Model()
export class AddressSelectArgsDto {
  @QryObj(() => AddressSelectDto) select?: AddressSelectDto;
  @QryObj(() => AddressSelectDto) omit?: AddressSelectDto;
}

@Model()
export class AddressFindOneArgsDto extends AddressSelectArgsDto {
  @QryObj(() => AddressWhereUniqueDto) where: AddressWhereUniqueDto;
}

@Model()
export class AddressFindManyArgsDto
  extends AddressSelectArgsDto
  implements P.AddressFindManyArgs
{
  @QryTake() take: number;
  @QrySkip() skip: number;
  @QryObj(() => AddressOrderDto) orderBy?: AddressOrderDto;
  @QryObj(() => AddressWhereDto) where?: AddressWhereDto;
  @QryObj(() => AddressWhereDto) cursor?: P.AddressWhereUniqueInput;
  @QryEnum(P.AddressScalarFieldEnum)
  distinct?: P.AddressScalarFieldEnum[];
}
