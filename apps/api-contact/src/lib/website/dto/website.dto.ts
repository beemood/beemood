import { BaseReadDto, Model, Prop } from '@bmod/property';
import { PartialType } from '@nestjs/swagger';
import type { Prisma as P, Website } from '@prisma/client';

@Model()
export class ReadWebsiteDto extends BaseReadDto implements Website {
  @Prop({ type: 'string' }) url: string;
  @Prop({ type: 'integer' }) contactId: number;
}

@Model()
export class CreateWebsiteDto implements P.WebsiteUncheckedCreateInput {
  @Prop({ type: 'string', required: true, unique: true, maxLength: 100 })
  url: string;
  
  @Prop({ type: 'integer', required: true })
  contactId: number;
}

@Model()
export class UpdateWebsiteDto extends PartialType(CreateWebsiteDto) {}
