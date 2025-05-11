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
import type { OrderDirection, StringFilter } from '@bmod/types';
import type { Department } from '@prisma/client';
import { Prisma as P } from '@prisma/client';
import { ProductSelectArgsDto } from '../../product/dto/query-product.dto.js';

@Model()
export class DepartmentWhereDto
  extends BaseWhereDto
  implements P.DepartmentWhereInput
{
  @QryStr() name: StringFilter;
}

@Model()
export class DepartmentWhereUniqueDto
  extends BaseUniqueWhereDto
  implements Department
{
  @Prop({ type: 'string' }) name: string;
}

@Model()
export class DepartmentSelectDto
  extends BaseSelectDto
  implements P.DepartmentSelect
{
  @QrySelect() name?: boolean;

  @QryObj(() => ProductSelectArgsDto) Product?: ProductSelectArgsDto;
}

@Model()
export class DepartmentOrderDto
  extends BaseOrderDto
  implements P.DepartmentOrderByWithRelationInput
{
  @QryOrd() name?: OrderDirection;
}

@Model()
export class DepartmentSelectArgsDto {
  @QryObj(() => DepartmentSelectDto) select?: DepartmentSelectDto;
  @QryObj(() => DepartmentSelectDto) omit?: DepartmentSelectDto;
}

@Model()
export class DepartmentFindOneArgsDto extends DepartmentSelectArgsDto {
  @QryObj(() => DepartmentWhereUniqueDto) where: DepartmentWhereUniqueDto;
}

@Model()
export class DepartmentFindManyArgsDto
  extends DepartmentSelectArgsDto
  implements P.DepartmentFindManyArgs
{
  @QryTake() take: number;
  @QrySkip() skip: number;
  @QryObj(() => DepartmentOrderDto) orderBy?: DepartmentOrderDto;
  @QryObj(() => DepartmentWhereDto) where?: DepartmentWhereDto;
  @QryObj(() => DepartmentWhereDto) cursor?: P.DepartmentWhereUniqueInput;
  @QryEnum(P.DepartmentScalarFieldEnum)
  distinct?: P.DepartmentScalarFieldEnum[];
}
