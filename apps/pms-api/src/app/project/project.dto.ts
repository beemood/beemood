import type {
  KeyOf,
  OrderDirection,
  OrderQueryType,
  SelectQueryType,
  SingleType,
} from '@bmod/types';
import type { StringQueryDto } from '@bmod/validation';
import {
  BaseDto,
  BaseOrderDto,
  BaseQueryDto,
  BaseSelectDto,
  BaseWhereQueryDto,
  Dto,
  OrderQueryProperty,
  Property,
  StringQueryProperty,
} from '@bmod/validation';
import { PartialType } from '@nestjs/swagger';
import type { Project } from '@prisma/pms';

@Dto()
export class ProjectDto extends BaseDto<Date> implements Project {
  @Property({ type: 'string' }) name: string;
  @Property({ type: 'string' }) description: string;
}

@Dto()
export class CreateProjectDto implements Pick<Project, 'name' | 'description'> {
  @Property({ type: 'string', required: true, stringFormat: 'name' })
  name: string;

  @Property({ type: 'string', required: true, stringFormat: 'description' })
  description: string;
}

@Dto()
export class UpdateProjectDto extends PartialType(CreateProjectDto) {}

@Dto()
export class ProjectWhereDto
  extends BaseWhereQueryDto
  implements SingleType<Project, any>
{
  @StringQueryProperty() name?: StringQueryDto | string;
  @StringQueryProperty() description?: StringQueryDto | string;
}

@Dto()
export class ProjectOrderDto
  extends BaseOrderDto
  implements OrderQueryType<Project>
{
  @OrderQueryProperty() name?: OrderDirection;
  @OrderQueryProperty() description?: OrderDirection;
}

@Dto()
export class ProjectSelectDto
  extends BaseSelectDto
  implements SelectQueryType<Project>
{
  @Property({ type: 'boolean', transform: true }) name?: boolean;
  @Property({ type: 'boolean', transform: true }) description?: boolean;
}

@Dto()
export class ProjectQueryDto extends BaseQueryDto {
  @Property({ type: 'string', isIn: Object.keys(ProjectDto), transform: true })
  distinct: KeyOf<Project>;

  @Property({ type: 'object', target: () => ProjectSelectDto, transform: true })
  select: ProjectSelectDto;

  @Property({ type: 'object', target: () => ProjectOrderDto, transform: true })
  orderBy: ProjectOrderDto;

  @Property({ type: 'object', target: () => ProjectWhereDto, transform: true })
  where: ProjectWhereDto;
}
