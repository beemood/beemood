import type { KeyOf } from '@bmod/types';
import { ArrayValue, ObjectValue } from '@bmod/types';
import { BaseQueryDto, Dto, Property } from '@bmod/validation';
import type { Project } from '@prisma/pms';
import { OrderProjectDto } from './order-project.dto.js';
import { ProjectWhereDto } from './project-where.dto.js';
import { ReadProjectDto } from './read-project.dto.js';
import { SelectProjectDto } from './select-project.dto.js';

@Dto()
export class QueryProjectDto extends BaseQueryDto {
  @Property({
    type: 'array',
    items: { type: 'string', isIn: Object.keys(new ReadProjectDto()) },
    transform: true,
  })
  distinct = ArrayValue<KeyOf<Project>>();

  @Property({ type: 'object', target: () => SelectProjectDto, transform: true })
  select = ObjectValue<SelectProjectDto>();

  @Property({ type: 'object', target: () => OrderProjectDto, transform: true })
  orderBy = ObjectValue<OrderProjectDto>();

  @Property({ type: 'object', target: () => ProjectWhereDto, transform: true })
  where = ObjectValue<ProjectWhereDto>();
}
