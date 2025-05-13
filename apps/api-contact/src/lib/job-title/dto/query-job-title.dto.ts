import type { WhereStringDto } from '@bmod/property';
import {
  BaseOrderDto,
  BaseSelectDto,
  BaseUniqueWhereDto,
  BaseWhereDto,
  Model,
  Prop,
  QryEnum, QryObj,
  QryOrd,
  QrySelect,
  QrySkip,
  QryStr,
  QryTake
} from '@bmod/property';
import type { OrderDirection } from '@bmod/types';
import type { JobTitle } from '@prisma/client';
import { Prisma as P } from '@prisma/client';

@Model()
export class JobTitleWhereDto
  extends BaseWhereDto
  implements P.JobTitleWhereInput
{
  @QryStr() name: WhereStringDto;
}

@Model()
export class JobTitleWhereUniqueDto
  extends BaseUniqueWhereDto
  implements Partial<JobTitle>
{
  @Prop({ type: 'string' }) name?: string;
}

@Model()
export class JobTitleSelectDto
  extends BaseSelectDto
  implements P.JobTitleSelect
{
  @QrySelect() name?: boolean;
}

@Model()
export class JobTitleOrderDto
  extends BaseOrderDto
  implements P.JobTitleOrderByWithRelationInput
{
  @QryOrd() name?: OrderDirection;
}

@Model()
export class JobTitleSelectArgsDto {
  @QryObj(() => JobTitleSelectDto) select?: JobTitleSelectDto;
  @QryObj(() => JobTitleSelectDto) omit?: JobTitleSelectDto;
}

@Model()
export class JobTitleFindOneArgsDto extends JobTitleSelectArgsDto {
  @QryObj(() => JobTitleWhereUniqueDto) where: JobTitleWhereUniqueDto;
}

@Model()
export class JobTitleFindManyArgsDto
  extends JobTitleSelectArgsDto
  implements P.JobTitleFindManyArgs
{
  @QryTake() take: number;
  @QrySkip() skip: number;
  @QryObj(() => JobTitleOrderDto) orderBy?: JobTitleOrderDto;
  @QryObj(() => JobTitleWhereDto) where?: JobTitleWhereDto;
  @QryObj(() => JobTitleWhereDto) cursor?: P.JobTitleWhereUniqueInput;
  @QryEnum(P.JobTitleScalarFieldEnum)
  distinct?: P.JobTitleScalarFieldEnum[];
}
