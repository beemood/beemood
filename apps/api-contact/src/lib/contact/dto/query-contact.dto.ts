import type {
  WhereDateDto,
  WhereNumberDto,
  WhereStringDto,
} from '@bmod/property';
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
import type { Contact, Gender } from '@prisma/client';
import { Prisma as P } from '@prisma/client';

@Model()
export class ContactWhereDto
  extends BaseWhereDto
  implements P.ContactWhereInput
{
  @QryStr() firstName: WhereStringDto;
  @QryStr() lastName: WhereStringDto;
  @QryStr() preferedName: WhereStringDto;
  @QryStr() title: WhereStringDto;
  @QryStr() gender: Gender;
  @QryStr() dob: WhereDateDto;
  @QryStr() primaryEmail: WhereStringDto;
  @QryStr() primaryPhone: WhereStringDto;
  @QryStr() workEmail: WhereStringDto;
  @QryStr() workPhone: WhereStringDto;
  @QryStr() personalEmail: WhereStringDto;
  @QryStr() personalPhone: WhereStringDto;
  @QryNum() departmentId: WhereNumberDto;
  @QryNum() jobTitleId: WhereNumberDto;
  @QryNum() companyId: WhereNumberDto;
}

@Model()
export class ContactWhereUniqueDto
  extends BaseUniqueWhereDto
  implements Partial<Contact>
{
  @Prop({ type: 'string' }) firstName: string;
  @Prop({ type: 'string' }) lastName: string;
  @Prop({ type: 'string' }) preferedName: string;
  @Prop({ type: 'string' }) title: string;
  @Prop({ type: 'string' }) gender: Gender;
  @Prop({ type: 'string' }) dob: Date;
  @Prop({ type: 'string' }) primaryEmail: string;
  @Prop({ type: 'string' }) primaryPhone: string;
  @Prop({ type: 'string' }) workEmail: string;
  @Prop({ type: 'string' }) workPhone: string;
  @Prop({ type: 'string' }) personalEmail: string;
  @Prop({ type: 'string' }) personalPhone: string;
  @Prop({ type: 'integer' }) departmentId: number;
  @Prop({ type: 'integer' }) jobTitleId: number;
  @Prop({ type: 'integer' }) companyId: number;
}

@Model()
export class ContactSelectDto extends BaseSelectDto implements P.ContactSelect {
  @QrySelect() firstName?: boolean;
  @QrySelect() lastName?: boolean;
  @QrySelect() preferedName?: boolean;
  @QrySelect() title?: boolean;
  @QrySelect() gender?: boolean;
  @QrySelect() dob?: boolean;
  @QrySelect() primaryEmail?: boolean;
  @QrySelect() primaryPhone?: boolean;
  @QrySelect() workEmail?: boolean;
  @QrySelect() workPhone?: boolean;
  @QrySelect() personalEmail?: boolean;
  @QrySelect() personalPhone?: boolean;
  @QrySelect() departmentId?: boolean;
  @QrySelect() jobTitleId?: boolean;
  @QrySelect() companyId?: boolean;
  @QrySelect() Departmenet?: boolean;
  @QrySelect() JobTitle?: boolean;
  @QrySelect() Company?: boolean;
  @QrySelect() Address?: boolean;
  @QrySelect() SocialMedia?: boolean;
  @QrySelect() Phone?: boolean;
  @QrySelect() Email?: boolean;
  @QrySelect() Website?: boolean;
}

@Model()
export class ContactOrderDto
  extends BaseOrderDto
  implements P.ContactOrderByWithRelationInput
{
  @QryOrd() firstName?: OrderDirection;
  @QryOrd() lastName?: OrderDirection;
  @QryOrd() preferedName?: OrderDirection;
  @QryOrd() title?: OrderDirection;
  @QryOrd() gender?: OrderDirection;
  @QryOrd() dob?: OrderDirection;
  @QryOrd() primaryEmail?: OrderDirection;
  @QryOrd() primaryPhone?: OrderDirection;
  @QryOrd() workEmail?: OrderDirection;
  @QryOrd() workPhone?: OrderDirection;
  @QryOrd() personalEmail?: OrderDirection;
  @QryOrd() personalPhone?: OrderDirection;
  @QryOrd() departmentId?: OrderDirection;
  @QryOrd() jobTitleId?: OrderDirection;
  @QryOrd() companyId?: OrderDirection;
}

@Model()
export class ContactSelectArgsDto {
  @QryObj(() => ContactSelectDto) select?: ContactSelectDto;
  @QryObj(() => ContactSelectDto) omit?: ContactSelectDto;
}

@Model()
export class ContactFindOneArgsDto extends ContactSelectArgsDto {
  @QryObj(() => ContactWhereUniqueDto) where: ContactWhereUniqueDto;
}

@Model()
export class ContactFindManyArgsDto
  extends ContactSelectArgsDto
  implements P.ContactFindManyArgs
{
  @QryTake() take: number;
  @QrySkip() skip: number;
  @QryObj(() => ContactOrderDto) orderBy?: ContactOrderDto;
  @QryObj(() => ContactWhereDto) where?: ContactWhereDto;
  @QryObj(() => ContactWhereDto) cursor?: P.ContactWhereUniqueInput;
  @QryEnum(P.ContactScalarFieldEnum)
  distinct?: P.ContactScalarFieldEnum[];
}
