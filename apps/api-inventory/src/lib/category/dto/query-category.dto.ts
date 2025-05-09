import {
  Model,
  Prop,
  QryDate,
  QryEnum,
  QryNum,
  QryObj,
  QryOrd,
  QrySelect,
  QrySkip,
  QryStr,
  QryTake,
} from '@bmod/property';
import type {
  DateTimeFilter,
  IntFilter,
  OrderDirection,
  StringFilter,
} from '@bmod/types';
import type { Category } from '@prisma/client';
import { Prisma as P } from '@prisma/client';
import { ProductSelectArgsDto } from '../../product/dto/query-product.dto.js';

@Model()
export class CategoryWhereDto implements P.CategoryWhereInput {
  @QryObj(() => CategoryWhereDto) AND: CategoryWhereDto[];
  @QryObj(() => CategoryWhereDto) OR: CategoryWhereDto[];
  @QryObj(() => CategoryWhereDto) NOT: CategoryWhereDto[];
  @QryNum() id: IntFilter;
  @QryDate() createdAt: DateTimeFilter;
  @QryDate() updatedAt: DateTimeFilter;
  @QryDate() deletedAt: DateTimeFilter;
  @QryStr() name: StringFilter;
}

@Model()
export class CategoryWhereUniqueDto implements Category {
  categoryId: number | null;
  @Prop({ type: 'integer' }) id: number;
  @Prop({ type: 'string', format: 'date' }) createdAt: Date;
  @Prop({ type: 'string', format: 'date' }) updatedAt: Date;
  @Prop({ type: 'string', format: 'date' }) deletedAt: Date;
  @Prop({ type: 'string' }) name: string;
}

@Model()
export class CategorySelectDto implements P.CategorySelect {
  @QrySelect() id?: boolean;
  @QrySelect() createdAt?: boolean;
  @QrySelect() updatedAt?: boolean;
  @QrySelect() deletedAt?: boolean;
  @QrySelect() name?: boolean;
  @QryObj(() => ProductSelectArgsDto) products?: ProductSelectArgsDto;
}

@Model()
export class CategoryOrderDto implements P.CategoryOrderByWithRelationInput {
  @QryOrd() id?: OrderDirection;
  @QryOrd() createdAt?: OrderDirection;
  @QryOrd() updatedAt?: OrderDirection;
  @QryOrd() deletedAt?: OrderDirection;
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
