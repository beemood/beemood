import { Prop } from '@beemood/prop'

import * as P from '../prisma/client.js'

export class ManagerCreateDto {

}

export class UserProfileCreateDto {
@Prop() externalId: string;
@Prop() dob: Date;
@Prop() shiftStart: Date;
@Prop() email: string;
@Prop() firstName: string;
@Prop() lastName: string;
@Prop() bio: string;
@Prop() isActive?: boolean ;
@Prop() age: number;
@Prop() heightCm: number;
@Prop() weightGrams: number;
@Prop() salary: number;
@Prop() commissionRate?: number;
@Prop() latitude: number;
@Prop() longitude: number;
@Prop() role?: P.$Enums.Role;;
@Prop() settings?: P.Prisma.InputJsonValue;
@Prop() avatar: Buffer;
@Prop() tags: string[];
@Prop() scores: number[];
@Prop() managerId: number;
}