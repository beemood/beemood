/* eslint-disable @nx/enforce-module-boundaries */
import type { KeyOf } from '@bmod/types';
import { BaseDto, Dto, Property } from '@bmod/validation';
import { PartialType } from '@nestjs/swagger';
import type { Project } from '@prisma/pms';

@Dto()
export class ProjectDto extends BaseDto<Date> implements Project {
  @Property({ type: 'string' }) name: string;
  @Property({ type: 'string' }) description: string;
}

@Dto()
export class CreateProjectDto implements Pick<Project, 'name'> {
  @Property({ type: 'string', required: true, stringFormat: 'name' })
  name: string;

  @Property({ type: 'string', required: true, stringFormat: 'description' })
  description: string;
}

@Dto()
export class UpdateProjectDto extends PartialType(CreateProjectDto) {}

@Dto()
export class QueryProjectDto {
  @Property({ type: 'string' }) name?: string;
  @Property({ type: 'string' }) description?: string;

  @Property({ type: 'integer', minimum: 1, defaultValue: 100, transform: true })
  take?: number;

  @Property({ type: 'integer', minimum: 0, transform: true }) skip?: number;

  @Property({
    type: 'array',
    items: { type: 'string' },
  })
  select: Partial<Record<KeyOf<Project>, boolean>>;
}
