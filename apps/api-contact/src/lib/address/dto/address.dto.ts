import { BaseReadDto, Model, Prop } from '@bmod/property';
import { PartialType } from '@nestjs/swagger';
import type { Address, Prisma as P } from '@prisma/client';

@Model()
export class ReadAddressDto extends BaseReadDto implements Address {
  @Prop({ type: 'string' }) country: string;
  @Prop({ type: 'string' }) street: string;
  @Prop({ type: 'string' }) city: string;
  @Prop({ type: 'string' }) state: string;
  @Prop({ type: 'string' }) zip: string;
  @Prop({ type: 'integer' }) contactId: number;
}

@Model()
export class CreateAddressDto implements P.AddressUncheckedCreateInput {
  @Prop({ type: 'string', required: true }) country: string;
  @Prop({ type: 'string', required: true }) street: string;
  @Prop({ type: 'string', required: true }) city: string;
  @Prop({ type: 'string', required: true }) state: string;
  @Prop({ type: 'string', required: true }) zip: string;
  @Prop({ type: 'integer', required: true }) contactId: number;
}

@Model()
export class UpdateAddressDto extends PartialType(CreateAddressDto) {}
