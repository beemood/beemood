// eslint-disable-next-line @nx/enforce-module-boundaries
import type { Prisma } from '@beemood/hr-prisma';
import { Dto } from '@bmod/property';
import { OmitHrProperty } from '../decorator/omit-hr-property.js';
import { OrderHrProperty } from '../decorator/order-hr-property.js';
import { SelectHrProperty } from '../decorator/select-hr-property.js';
import { SkipHrProperty } from '../decorator/skip-hr-property.js';
import { TakeHrProperty } from '../decorator/take-hr-property.js';
import { WhereHrProperty } from '../decorator/where-hr-property.js';

@Dto()
export class FindManyHrDto implements Prisma.HrFindManyArgs {
  @TakeHrProperty() take?: number;
  @SkipHrProperty() skip?: number;
  @SelectHrProperty() select?: Prisma.HrSelect;
  @OmitHrProperty() omit?: Prisma.HrOmit;
  @WhereHrProperty() where?: Prisma.HrWhereInput;
  @OrderHrProperty() orderBy?: Prisma.HrOrderByWithAggregationInput;
}
