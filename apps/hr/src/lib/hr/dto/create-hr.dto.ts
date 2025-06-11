// eslint-disable-next-line @nx/enforce-module-boundaries
import type { Prisma } from '@beemood/hr-prisma';
import { Dto, Property } from '@bmod/property';

@Dto()
export class CreateHrDto implements Prisma.HrCreateInput {
  @Property({ type: 'string', required: true, minLength: 3, maxLength: 30 })
  name: string;
}
