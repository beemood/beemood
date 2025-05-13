import { BaseReadDto, Model, Prop } from '@bmod/property';
import { PartialType } from '@nestjs/swagger';
import type { Prisma as P, Phone } from '@prisma/client';

@Model()
export class ReadPhoneDto extends BaseReadDto implements Phone {
  @Prop({ type: 'string' }) phone: string;
  @Prop({ type: 'integer' }) contactId: number;
}

@Model()
export class CreatePhoneDto implements P.PhoneUncheckedCreateInput {
  @Prop({ type: 'string', stringFormat: 'phone' }) phone: string;
  @Prop({ type: 'integer', required: true }) contactId: number;
}

@Model()
export class UpdatePhoneDto extends PartialType(CreatePhoneDto) {}
