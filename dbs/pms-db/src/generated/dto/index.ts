import { Prop } from '@beemood/prop';

import * as P from '../prisma/client.js';

export class ManagerCreateDto {}

export class UserProfileCreateDto {
  @Prop({ required: true, format: 'uuid7' }) externalId: string;
  @Prop({ required: true }) dob: Date;
  @Prop() shiftStart?: Date;
  @Prop({ required: true, format: 'email', lessThanOrEqualTo: 255 })
  email: string;
  @Prop({ required: true, lessThanOrEqualTo: 100 }) firstName: string;
  @Prop({ required: true, lessThanOrEqualTo: 100 }) lastName: string;
  @Prop({ lessThanOrEqualTo: 1000 }) bio?: string;
  @Prop() isActive?: boolean;
  @Prop() age?: number;
  @Prop({ required: true }) heightCm: number;
  @Prop({ required: true }) weightGrams: number;
  @Prop({ required: true }) salary: number;
  @Prop() commissionRate?: number;
  @Prop() latitude?: number;
  @Prop() longitude?: number;
  @Prop() role?: P.$Enums.Role;
  @Prop({ format: 'json' }) settings?: P.Prisma.InputJsonValue;
  @Prop() avatar?: Buffer;
  @Prop({ isArray: true, type: () => String, lessThanOrEqualTo: 1000 })
  tags?: string[];
  @Prop({ isArray: true, type: () => Number }) scores?: number[];
  @Prop({ required: true }) managerId: number;
}

export class UserCreateDto {
  @Prop() isActive?: boolean;
  @Prop({ required: true, format: 'uuid7' }) uuid: string;
}

export class ProjectCreateDto {
  @Prop() isActive?: boolean;
  @Prop({ required: true, lessThanOrEqualTo: 255 }) name: string;
  @Prop({ lessThanOrEqualTo: 1000 }) description?: string;
  @Prop({ required: true }) startedAt: Date;
  @Prop() endedAt?: Date;
  @Prop() dueAt?: Date;
}

export class SprintCreateDto {
  @Prop() isActive?: boolean;
  @Prop({ required: true, lessThanOrEqualTo: 255 }) name: string;
  @Prop({ lessThanOrEqualTo: 1000 }) description?: string;
  @Prop({ required: true }) projectId: number;
}

export class TaskCreateDto {
  @Prop() isActive?: boolean;
  @Prop({ required: true, format: 'json' }) notes: P.Prisma.InputJsonValue;
}
