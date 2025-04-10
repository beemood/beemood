import type { SingleType } from '@bmod/types';
import { ObjectValue } from '@bmod/types';
import type { StringQueryDto } from '@bmod/validation';
import { BaseWhereQueryDto, Dto, StringQueryProperty } from '@bmod/validation';
import type { Project } from '@prisma/pms';

@Dto()
export class WhereProjectDto
  extends BaseWhereQueryDto
  implements SingleType<Project>
{
  @StringQueryProperty() name? = ObjectValue<StringQueryDto>();
  @StringQueryProperty() description? = ObjectValue<StringQueryDto>();
}
