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
import type { ProductVariant } from '@prisma/client';
import { Prisma as P } from '@prisma/client';

@Model()
export class ProductVariantWhereDto
  extends BaseWhereDto
  implements P.ProductVariantWhereInput
{
  @QryStr() name: StringFilter;
}

@Model()
export class ProductVariantWhereUniqueDto
  extends BaseUniqueWhereDto
  implements ProductVariant
{
  @Prop({ type: 'string' }) sku: string;
  @Prop({ type: 'string' }) barcode: string;
  @Prop({ type: 'boolean' }) trackSerialNumber: boolean | null;
  @Prop({ type: 'integer' }) productId: number;
}

@Model()
export class ProductVariantSelectDto
  extends BaseSelectDto
  implements P.ProductVariantSelect
{
  @QrySelect() sku: boolean;
  @QrySelect() barcode: boolean;
  @QrySelect() trackSerialNumber: boolean;
  @QrySelect() productId: boolean;

  @QrySelect() Product: boolean;
  @QrySelect() ProductAttribute: boolean;
  @QrySelect() Price: boolean;
  @QrySelect() Quantity: boolean;
  @QrySelect() SerialNumber: boolean;
}

@Model()
export class ProductVariantOrderDto
  extends BaseOrderDto
  implements P.ProductVariantOrderByWithRelationInput
{
  @QryOrd() sku: OrderDirection;
  @QryOrd() barcode: OrderDirection;
  @QryOrd() trackSerialNumber: OrderDirection;
  @QryOrd() productId: OrderDirection;
}

@Model()
export class ProductVariantSelectArgsDto {
  @QryObj(() => ProductVariantSelectDto) select?: ProductVariantSelectDto;
  @QryObj(() => ProductVariantSelectDto) omit?: ProductVariantSelectDto;
}

@Model()
export class ProductVariantFindOneArgsDto extends ProductVariantSelectArgsDto {
  @QryObj(() => ProductVariantWhereUniqueDto)
  where: ProductVariantWhereUniqueDto;
}

@Model()
export class ProductVariantFindManyArgsDto
  extends ProductVariantSelectArgsDto
  implements P.ProductVariantFindManyArgs
{
  @QryTake() take: number;
  @QrySkip() skip: number;
  @QryObj(() => ProductVariantOrderDto) orderBy?: ProductVariantOrderDto;
  @QryObj(() => ProductVariantWhereDto) where?: ProductVariantWhereDto;
  @QryObj(() => ProductVariantWhereDto)
  cursor?: P.ProductVariantWhereUniqueInput;
  @QryEnum(P.ProductVariantScalarFieldEnum)
  distinct?: P.ProductVariantScalarFieldEnum[];
}
