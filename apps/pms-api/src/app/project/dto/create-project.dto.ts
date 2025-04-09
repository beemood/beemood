import type { ExcludePick } from '@bmod/types';
import { RequiredStringValue } from '@bmod/types';
import type { BaseDto } from '@bmod/validation';
import { Dto, Property } from '@bmod/validation';
import type { Project } from '@prisma/pms';

@Dto()
export class CreateProjectDto implements ExcludePick<Project, BaseDto> {
  @Property({ type: 'string', required: true, stringFormat: 'name' })
  name = RequiredStringValue();

  @Property({ type: 'string', required: true, stringFormat: 'description' })
  description = RequiredStringValue();
}
