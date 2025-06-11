// eslint-disable-next-line @nx/enforce-module-boundaries
import type { Prisma } from '@beemood/hr-prisma';
import { BaseOrderDto, Dto, OrderProperty } from '@bmod/property';
import type { SortOrder } from '@bmod/types';

@Dto()
export class OrderHrDto
  extends BaseOrderDto
  implements Prisma.HrOrderByWithRelationInput
{
  @OrderProperty() name?: SortOrder;
}
