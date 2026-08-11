import { Prop } from '@beemood/prop';

import * as P from '../prisma/client.js';

export class ManagerCreateDto {}

export class UserProfileCreateDto {
  @Prop({ required: true }) externalId: string;
  @Prop({ required: true }) dob: Date;
  @Prop() shiftStart?: Date;
  @Prop({ required: true }) email: string;
  @Prop({ required: true, minLength: 3, maxLength: 4 }) firstName: string;
  @Prop({ required: true }) lastName: string;
  @Prop() bio?: string;
  @Prop() isActive?: boolean;
  @Prop() age?: number;
  @Prop({ required: true }) heightCm: number;
  @Prop({ required: true }) weightGrams: number;
  @Prop({ required: true }) salary: number;
  @Prop() commissionRate?: number;
  @Prop() latitude?: number;
  @Prop() longitude?: number;
  @Prop() role?: P.$Enums.Role;
  @Prop() settings?: P.Prisma.InputJsonValue;
  @Prop() avatar?: Buffer;
  @Prop() tags?: string[];
  @Prop() scores?: number[];
  @Prop({ required: true }) managerId: number;
}
