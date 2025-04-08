import type { ExcludePick, KeyOf, OrderDirection } from '@bmod/types';
import {
  ArrayValue,
  BooleanValue,
  ObjectValue,
  RequiredStringValue,
  StringValue,
  type OrderQueryType,
  type SelectQueryType,
  type SingleType,
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
export class ProjectDto extends BaseDto implements Project {
  @Property({ type: 'string' }) name = RequiredStringValue();
  @Property({ type: 'string' }) description = RequiredStringValue();
}

@Dto()
export class CreateProjectDto implements ExcludePick<Project, BaseDto> {
  @Property({ type: 'string', required: true, stringFormat: 'name' })
  name = RequiredStringValue();

  @Property({ type: 'string', required: true, stringFormat: 'description' })
  description = RequiredStringValue();
}

@Dto()
export class UpdateProjectDto extends PartialType(CreateProjectDto) {}

@Dto()
export class ProjectWhereDto
  extends BaseWhereQueryDto
  implements SingleType<Project>
{
  @StringQueryProperty() name? = ObjectValue<StringQueryDto>();
  @StringQueryProperty() description? = ObjectValue<StringQueryDto>();
}

@Dto()
export class ProjectOrderDto
  extends BaseOrderDto
  implements OrderQueryType<Project>
{
  @OrderQueryProperty() name? = StringValue<OrderDirection>();
  @OrderQueryProperty() description? = StringValue<OrderDirection>();
}

@Dto()
export class ProjectSelectDto
  extends BaseSelectDto
  implements SelectQueryType<Project>
{
  @Property({ type: 'boolean', transform: true }) name = BooleanValue();
  @Property({ type: 'boolean', transform: true }) description = BooleanValue();
}

@Dto()
export class ProjectQueryDto extends BaseQueryDto {
  @Property({
    type: 'array',
    items: { type: 'string', isIn: Object.keys(new ProjectDto()) },
    transform: true,
  })
  distinct = ArrayValue<KeyOf<Project>>();

  @Property({ type: 'object', target: () => ProjectSelectDto, transform: true })
  select = ObjectValue<ProjectSelectDto>();

  @Property({ type: 'object', target: () => ProjectOrderDto, transform: true })
  orderBy = ObjectValue<ProjectOrderDto>();

  @Property({ type: 'object', target: () => ProjectWhereDto, transform: true })
  where = ObjectValue<ProjectWhereDto>();
}
