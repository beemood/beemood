import type { OrderDirection, OrderQueryType } from '@bmod/types';
import { StringValue } from '@bmod/types';
import { BaseOrderDto, Dto, OrderQueryProperty } from '@bmod/validation';
import type { Project } from '@prisma/pms';

@Dto()
export class OrderProjectDto
  extends BaseOrderDto
  implements OrderQueryType<Project>
{
  @OrderQueryProperty() name? = StringValue<OrderDirection>();
  @OrderQueryProperty() description? = StringValue<OrderDirection>();
}
