/* eslint-disable @nx/enforce-module-boundaries */
import { BaseReadDto, Model, Prop } from '@bmod/property';
import { PartialType } from '@nestjs/swagger';
import type { Prisma as P, Tag } from '@prisma/client';

@Model()
export class ReadTagDto extends BaseReadDto implements Tag {
  @Prop({ type: 'string' }) name: string;
}

@Model()
export class CreateTagDto implements P.TagUncheckedCreateInput {
  @Prop({ type: 'string', required: true, unique: true, maxLength: 100 })
  name: string;
}

@Model()
export class UpdateTagDto extends PartialType(CreateTagDto) {}
