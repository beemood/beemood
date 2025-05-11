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
import type { Category } from '@prisma/client';
import { Prisma as P } from '@prisma/client';
import { ProductSelectArgsDto } from '../../product/dto/query-product.dto.js';

@Model()
export class CategoryWhereDto
  extends BaseWhereDto
  implements P.CategoryWhereInput
{
  @QryStr() name: StringFilter;
}

@Model()
export class CategoryWhereUniqueDto
  extends BaseUniqueWhereDto
  implements Category
{
  @Prop({ type: 'string' }) name: string;
}

@Model()
export class CategorySelectDto
  extends BaseSelectDto
  implements P.CategorySelect
{
  @QrySelect() name?: boolean;

  @QryObj(() => ProductSelectArgsDto) Product?: ProductSelectArgsDto;
}

@Model()
export class CategoryOrderDto
  extends BaseOrderDto
  implements P.CategoryOrderByWithRelationInput
{
  @QryOrd() name?: OrderDirection;
}

@Model()
export class CategorySelectArgsDto {
  @QryObj(() => CategorySelectDto) select?: CategorySelectDto;
  @QryObj(() => CategorySelectDto) omit?: CategorySelectDto;
}

@Model()
export class CategoryFindOneArgsDto extends CategorySelectArgsDto {
  @QryObj(() => CategoryWhereUniqueDto) where: CategoryWhereUniqueDto;
}

@Model()
export class CategoryFindManyArgsDto
  extends CategorySelectArgsDto
  implements P.CategoryFindManyArgs
{
  @QryTake() take: number;
  @QrySkip() skip: number;
  @QryObj(() => CategoryOrderDto) orderBy?: CategoryOrderDto;
  @QryObj(() => CategoryWhereDto) where?: CategoryWhereDto;
  @QryObj(() => CategoryWhereDto) cursor?: P.CategoryWhereUniqueInput;
  @QryEnum(P.CategoryScalarFieldEnum) distinct?: P.CategoryScalarFieldEnum[];
}
