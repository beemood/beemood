import type { SelectQueryType } from '@bmod/types';
import { BooleanValue } from '@bmod/types';
import { BaseSelectDto, Dto, Property } from '@bmod/validation';
import type { Project } from '@prisma/pms';

@Dto()
export class SelectProjectDto
  extends BaseSelectDto
  implements SelectQueryType<Project>
{
  @Property({ type: 'boolean', transform: true }) name = BooleanValue();
  @Property({ type: 'boolean', transform: true }) description = BooleanValue();
}
