import { Model, Prop } from '@bmod/property';
import { PartialType } from '@nestjs/swagger';
import type { Prisma as P, PriceLevel } from '@prisma/client';

@Model()
export class ReadPriceLevelDto implements Partial<PriceLevel> {
  @Prop({ type: 'integer' }) id?: number;
  @Prop({ type: 'string' }) createdAt?: Date;
  @Prop({ type: 'string' }) updatedAt?: Date;
  @Prop({ type: 'string' }) deletedAt?: Date;
  @Prop({ type: 'string' }) name?: string;
  @Prop({ type: 'number' }) taxrate?: P.Decimal;
}

@Model()
export class CreatePriceLevelDto implements P.PriceLevelUncheckedCreateInput {
  @Prop({ type: 'string' }) name: string;
  @Prop({ type: 'number' }) taxrate?: P.Decimal;
}

@Model()
export class UpdatePriceLevelDto extends PartialType(CreatePriceLevelDto) {}
