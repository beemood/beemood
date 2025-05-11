import { BaseReadDto, Model, Prop } from '@bmod/property';
import { PartialType } from '@nestjs/swagger';
import type { Prisma as P, ProductVariant } from '@prisma/client';

@Model()
export class ReadProductVariantDto
  extends BaseReadDto
  implements ProductVariant
{
  @Prop({ type: 'string' }) sku: string;
  @Prop({ type: 'string' }) barcode: string;
  @Prop({ type: 'boolean' }) trackSerialNumber: boolean | null;

  @Prop({ type: 'integer' }) productId: number;
}

@Model()
export class CreateProductVariantDto
  implements P.ProductVariantUncheckedCreateInput
{
  @Prop({ type: 'string', required: true }) sku: string;
  @Prop({ type: 'string', required: true }) barcode: string;
  @Prop({ type: 'boolean', defaultValue: false }) trackSerialNumber?: boolean;

  @Prop({ type: 'integer', required: true }) productId: number;
}

@Model()
export class UpdateProductVariantDto extends PartialType(
  CreateProductVariantDto
) {}
