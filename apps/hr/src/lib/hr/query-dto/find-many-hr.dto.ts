import type { Prisma } from '@beemood/hr-prisma';
import { Dto, Property } from '@bmod/property';
import { SelectHrDto } from './select-hr.dto.js';
import { OmitHrDto } from './omit-hr.dto.js';
import { WhereHrDto } from './where-hr.dto.js';
import { OrderHrDto } from './order-hr.dto.js';

@Dto()
export class FindManyHrDto implements Prisma.HrFindManyArgs {
  @Property({
    type: 'integer',
    minimum: 1,
    defaultValue: 20,
    transform: true,
  })
  take?: number;

  @Property({
    type: 'integer',
    minimum: 0,
    defaultValue: 0,
    transform: true,
  })
  skip?: number;

  @Property({
    type: 'object',
    target: () => SelectHrDto,
    transform: true,
  })
  select?: Prisma.HrSelect;

  @Property({
    type: 'object',
    target: () => OmitHrDto,
    transform: true,
  })
  omit?: Prisma.HrOmit;

  @Property({
    type: 'object',
    target: () => WhereHrDto,
    transform: true,
  })
  where?: Prisma.HrWhereInput;

  @Property({ type: 'object', target: () => OrderHrDto, transform: true })
  orderBy?: Prisma.HrOrderByWithAggregationInput;
}
