import { RequiredStringValue } from '@bmod/types';
import { BaseDto, Dto, Property } from '@bmod/validation';
import type { Project } from '@prisma/pms';

@Dto()
export class ReadProjectDto extends BaseDto implements Project {
  @Property({ type: 'string' }) name = RequiredStringValue();
  @Property({ type: 'string' }) description = RequiredStringValue();
}
