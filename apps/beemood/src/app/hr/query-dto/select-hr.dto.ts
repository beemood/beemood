// eslint-disable-next-line @nx/enforce-module-boundaries
import type { Prisma } from '@beemood/hr-prisma';
import { BaseSelectDto, Dto, SelectProperty } from '@bmod/property';

@Dto()
export class SelectHrDto extends BaseSelectDto implements Prisma.HrSelect {
  @SelectProperty() name?: boolean;
}
