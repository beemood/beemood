import { Model, Prop } from '@bmod/property';
import { PartialType } from '@nestjs/swagger';
import type { Prisma as P, Store } from '@prisma/client';

@Model()
export class ReadStoreDto implements Partial<Store> {
  @Prop({ type: 'integer' }) id?: number;

  @Prop({ type: 'string' }) createdAt?: Date;
  @Prop({ type: 'string' }) updatedAt?: Date;
  @Prop({ type: 'string' }) deletedAt?: Date;

  @Prop({ type: 'string' }) name?: string;
  @Prop({ type: 'string' }) description?: string;
  @Prop({ type: 'string' }) categoryId?: number;
}

@Model()
export class CreateStoreDto implements P.StoreUncheckedCreateInput {
  @Prop({ type: 'string' }) name: string;
  @Prop({ type: 'string' }) description?: string;
  @Prop({ type: 'integer' }) priceLevelId: number;
}

@Model()
export class UpdateStoreDto extends PartialType(CreateStoreDto) {}
