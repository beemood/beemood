import { BaseReadDto, Model, Prop } from '@bmod/property';
import { PartialType } from '@nestjs/swagger';
import type { Email, Prisma as P } from '@prisma/client';

@Model()
export class ReadEmailDto extends BaseReadDto implements Email {
  @Prop({ type: 'string' }) email: string;
  @Prop({ type: 'integer' }) contactId: number;
}

@Model()
export class CreateEmailDto implements P.EmailUncheckedCreateInput {
  @Prop({ type: 'string', required: true, unique: true, stringFormat: 'email' })
  email: string;
  @Prop({ type: 'integer', required: true }) contactId: number;
}

@Model()
export class UpdateEmailDto extends PartialType(CreateEmailDto) {}
