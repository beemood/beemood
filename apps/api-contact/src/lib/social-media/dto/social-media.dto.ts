import { BaseReadDto, Model, Prop } from '@bmod/property';
import { PartialType } from '@nestjs/swagger';
import type { Prisma as P, SocialMedia } from '@prisma/client';

@Model()
export class ReadSocialMediaDto extends BaseReadDto implements SocialMedia {
  @Prop({ type: 'string' }) url: string;
  @Prop({ type: 'integer' }) contactId: number;
}

@Model()
export class CreateSocialMediaDto implements P.SocialMediaUncheckedCreateInput {
  @Prop({ type: 'string', required: true, unique: true, maxLength: 100 })
  url: string;

  @Prop({ type: 'integer', required: true })
  contactId: number;
}

@Model()
export class UpdateSocialMediaDto extends PartialType(CreateSocialMediaDto) {}
