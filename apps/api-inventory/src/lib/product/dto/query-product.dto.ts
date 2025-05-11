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
import type { Product } from '@prisma/client';
import { Prisma as P } from '@prisma/client';

@Model()
export class ProductWhereDto
  extends BaseWhereDto
  implements P.ProductWhereInput
{
  @QryStr() name: WhereStringDto;
  @QryStr() description: WhereStringDto;
  @QryStr() barcode: WhereStringDto;
  @QryStr() brand: WhereStringDto;

  @QryNum() departmentId: WhereNumberDto;
  @QryNum() categoryId: WhereNumberDto;
  @QryNum() tagId: WhereNumberDto;
}

@Model()
export class ProductWhereUniqueDto
  extends BaseUniqueWhereDto
  implements Partial<Product>
{
  @Prop({ type: 'string' }) name?: string;
  @Prop({ type: 'string' }) description?: string;
  @Prop({ type: 'string' }) barcode?: string;
  @Prop({ type: 'string' }) brand?: string;

  @Prop({ type: 'string' }) departmentId?: number;
  @Prop({ type: 'string' }) categoryId?: number;
  @Prop({ type: 'string' }) tagId?: number;
}

@Model()
export class ProductSelectDto extends BaseSelectDto implements P.ProductSelect {
  @QrySelect() name?: boolean;
  @QrySelect() description?: boolean;
  @QrySelect() barcode?: boolean;
  @QrySelect() brand?: boolean;
  @QrySelect() departmentId?: boolean;
  @QrySelect() categoryId?: boolean;
  @QrySelect() tagId?: boolean;
}

@Model()
export class ProductOrderDto
  extends BaseOrderDto
  implements P.ProductOrderByWithRelationInput
{
  @QryOrd() name?: OrderDirection;
  @QryOrd() description?: OrderDirection;
  @QryOrd() barcode?: OrderDirection;
  @QryOrd() brand?: OrderDirection;
  @QryOrd() departmentId?: OrderDirection;
  @QryOrd() categoryId?: OrderDirection;
  @QryOrd() tagId?: OrderDirection;
}

@Model()
export class ProductSelectArgsDto {
  @QryObj(() => ProductSelectDto) select?: ProductSelectDto;
  @QryObj(() => ProductSelectDto) omit?: ProductSelectDto;
}

@Model()
export class ProductFindOneArgsDto extends ProductSelectArgsDto {
  @QryObj(() => ProductWhereUniqueDto) where: ProductWhereUniqueDto;
}

@Model()
export class ProductFindManyArgsDto
  extends ProductSelectArgsDto
  implements P.ProductFindManyArgs
{
  @QryTake() take: number;
  @QrySkip() skip: number;
  @QryObj(() => ProductOrderDto) orderBy?: ProductOrderDto;
  @QryObj(() => ProductWhereDto) where?: ProductWhereDto;
  @QryObj(() => ProductWhereDto) cursor?: P.ProductWhereUniqueInput;
  @QryEnum(P.ProductScalarFieldEnum)
  distinct?: P.ProductScalarFieldEnum[];
}
