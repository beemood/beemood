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
import type { Company } from '@prisma/client';
import { Prisma as P } from '@prisma/client';
import { ContactSelectArgsDto } from '../../contact/dto/query-contact.dto.js';
import { IndustrySelectArgsDto } from '../../industry/dto/query-industry.dto.js';

@Model()
export class CompanyWhereDto
  extends BaseWhereDto
  implements P.CompanyWhereInput
{
  @QryStr() name: WhereStringDto;
  @QryStr() industryId: WhereNumberDto;
}

@Model()
export class CompanyWhereUniqueDto
  extends BaseUniqueWhereDto
  implements Partial<Company>
{
  @Prop({ type: 'string' }) name?: string;
  @Prop({ type: 'integer' }) industryId?: number;
}

@Model()
export class CompanySelectDto extends BaseSelectDto implements P.CompanySelect {
  @QrySelect() name?: boolean;
  @QrySelect() industryId?: boolean;
  @QryObj(() => ContactSelectArgsDto) Contact: ContactSelectArgsDto;
  @QryObj(() => IndustrySelectArgsDto) Industry: IndustrySelectArgsDto;
}

@Model()
export class CompanyOrderDto
  extends BaseOrderDto
  implements P.CompanyOrderByWithRelationInput
{
  @QryOrd() name?: OrderDirection;
  @QryOrd() industryId?: OrderDirection;
}

@Model()
export class CompanySelectArgsDto {
  @QryObj(() => CompanySelectDto) select?: CompanySelectDto;
  @QryObj(() => CompanySelectDto) omit?: CompanySelectDto;
}

@Model()
export class CompanyFindOneArgsDto extends CompanySelectArgsDto {
  @QryObj(() => CompanyWhereUniqueDto) where: CompanyWhereUniqueDto;
}

@Model()
export class CompanyFindManyArgsDto
  extends CompanySelectArgsDto
  implements P.CompanyFindManyArgs
{
  @QryTake() take: number;
  @QrySkip() skip: number;
  @QryObj(() => CompanyOrderDto) orderBy?: CompanyOrderDto;
  @QryObj(() => CompanyWhereDto) where?: CompanyWhereDto;
  @QryObj(() => CompanyWhereDto) cursor?: P.CompanyWhereUniqueInput;
  @QryEnum(P.CompanyScalarFieldEnum)
  distinct?: P.CompanyScalarFieldEnum[];
}
