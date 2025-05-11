import { BaseReadDto, Model, Prop } from '@bmod/property';
import { PartialType } from '@nestjs/swagger';
import type { Prisma as P, Price } from '@prisma/client';

@Model()
export class ReadPriceDto extends BaseReadDto implements Price {
  @Prop({ type: 'number' }) price: P.Decimal;
  @Prop({ type: 'number' }) cost: P.Decimal;

  @Prop({ type: 'integer' }) productVariantId: number;
  @Prop({ type: 'integer' }) priceLevelId: number;
}

@Model()
export class CreatePriceDto implements P.PriceUncheckedCreateInput {
  @Prop({ type: 'number', required: true, minimum: 0 }) cost: number;
  @Prop({ type: 'number', required: true, minimum: 0 }) price: number;
  @Prop({ type: 'integer', required: true, minimum: 0 }) productVariantId: number;
  @Prop({ type: 'integer', required: true, minimum: 0 }) priceLevelId: number;
}

@Model()
export class UpdatePriceDto extends PartialType(CreatePriceDto) {}
