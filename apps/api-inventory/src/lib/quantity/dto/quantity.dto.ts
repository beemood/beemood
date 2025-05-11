/* eslint-disable @nx/enforce-module-boundaries */
import { BaseReadDto, Model, Prop } from '@bmod/property';
import { PartialType } from '@nestjs/swagger';
import type { Prisma as P, Quantity } from '@prisma/client';

@Model()
export class ReadQuantityDto extends BaseReadDto implements Quantity {
  @Prop({ type: 'integer' }) quantity: number;
  @Prop({ type: 'integer' }) minumumQuantity: number;
  @Prop({ type: 'integer' }) productVariantId: number;
  @Prop({ type: 'integer' }) storeId: number;
}

@Model()
export class CreateQuantityDto implements P.QuantityUncheckedCreateInput {
  @Prop({ type: 'integer', defaultValue: 0 }) quantity: number;
  @Prop({ type: 'integer' }) minumumQuantity?: number | null | undefined;

  @Prop({ type: 'integer', required: true }) productVariantId: number;
  @Prop({ type: 'integer', required: true }) storeId: number;
}

@Model()
export class UpdateQuantityDto extends PartialType(CreateQuantityDto) {}
