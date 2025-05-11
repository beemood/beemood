/* eslint-disable @nx/enforce-module-boundaries */
import { BaseReadDto, Model, Prop } from '@bmod/property';
import { PartialType } from '@nestjs/swagger';
import type { Prisma as P, PriceLevel } from '@prisma/client';

@Model()
export class ReadPriceLevelDto extends BaseReadDto implements PriceLevel {
  @Prop({ type: 'string' }) name: string;
  @Prop({ type: 'number' }) taxrate: P.Decimal;
}

@Model()
export class CreatePriceLevelDto implements P.PriceLevelUncheckedCreateInput {
  @Prop({ type: 'string', required: true, unique: true, maxLength: 100 })
  name: string;

  @Prop({ type: 'number', minimum: 0, maximum: 100 }) taxrate?: number;
}

@Model()
export class UpdatePriceLevelDto extends PartialType(CreatePriceLevelDto) {}
