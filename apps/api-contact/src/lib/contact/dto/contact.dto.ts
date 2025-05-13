import { BaseReadDto, Model, Prop } from '@bmod/property';
import { PartialType } from '@nestjs/swagger';
import type { Contact, Prisma as P } from '@prisma/client';

@Model()
export class ReadContactDto extends BaseReadDto implements Contact {
  @Prop({ type: 'string' }) firstName: string;
  @Prop({ type: 'string' }) lastName: string;
  @Prop({ type: 'string' }) preferedName: string | null;
  @Prop({ type: 'string' }) title: string | null;
  @Prop({ type: 'string' }) gender: string;
  @Prop({ type: 'string', format: 'date' }) dob: Date | null;

  @Prop({ type: 'string', stringFormat: 'email' }) primaryEmail: string;
  @Prop({ type: 'string', stringFormat: 'phone' }) primaryPhone: string;
  @Prop({ type: 'string', stringFormat: 'email' }) workEmail: string | null;
  @Prop({ type: 'string', stringFormat: 'phone' }) workPhone: string | null;
  @Prop({ type: 'string', stringFormat: 'email' }) personalEmail: string | null;
  @Prop({ type: 'string', stringFormat: 'phone' }) personalPhone: string | null;
  @Prop({ type: 'integer' }) departmentId: number;
  @Prop({ type: 'integer' }) jobTitleId: number;
  @Prop({ type: 'integer' }) companyId: number;
}

@Model()
export class CreateContactDto implements P.ContactUncheckedCreateInput {
  @Prop({ type: 'string', required: true }) firstName: string;
  @Prop({ type: 'string', required: true }) lastName: string;
  @Prop({ type: 'string' }) preferedName?: string;
  @Prop({ type: 'string' }) title?: string;
  @Prop({ type: 'string', required: true }) gender: string;
  @Prop({ type: 'string' }) dob?: Date;

  @Prop({ type: 'string', stringFormat: 'email' }) primaryEmail: string;
  @Prop({ type: 'string', stringFormat: 'phone' }) primaryPhone: string;

  @Prop({ type: 'string', stringFormat: 'email' }) workEmail?: string;

  @Prop({ type: 'string', stringFormat: 'phone' }) workPhone?: string;

  @Prop({ type: 'string', stringFormat: 'email' }) personalEmail?: string;

  @Prop({ type: 'string', stringFormat: 'phone' }) personalPhone?: string;

  @Prop({ type: 'integer' }) departmentId: number;
  @Prop({ type: 'integer' }) jobTitleId: number;
  @Prop({ type: 'integer' }) companyId: number;
}

@Model()
export class UpdateContactDto extends PartialType(CreateContactDto) {}
