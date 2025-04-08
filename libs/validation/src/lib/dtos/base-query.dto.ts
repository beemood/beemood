import type { OrderDirection } from '@bmod/types';
import {
  BooleanValue,
  NumberValue,
  ObjectValue,
  StringValue,
} from '@bmod/types';
import { Dto } from '../dto.decorator.js';
import { Property } from '../wrap/property.decorator.js';
import {
  DateQueryProperty,
  NumberQueryProperty,
  OrderQueryProperty,
} from '../wrap/query-property.js';
import type { DateQueryDto } from './date-query.dto.js';
import type { NumberQueryDto } from './number-query.dto.js';

@Dto()
export class BaseQueryDto {
  @Property({ type: 'integer', transform: true, minimum: 1, defaultValue: 20 })
  take? = NumberValue();

  @Property({ type: 'integer', transform: true, minimum: 0, defaultValue: 0 })
  skip? = NumberValue();
}

@Dto()
export class BaseWhereQueryDto {
  @NumberQueryProperty() id? = ObjectValue<NumberQueryDto>();
  @DateQueryProperty() createdAt? = ObjectValue<DateQueryDto>();
  @DateQueryProperty() updatedAt? = ObjectValue<DateQueryDto>();
  @DateQueryProperty() deletedAt? = ObjectValue<DateQueryDto>();
}

@Dto()
export class BaseOrderDto {
  @OrderQueryProperty() id? = StringValue<OrderDirection>();

  @OrderQueryProperty() createdAt? = StringValue<OrderDirection>();

  @OrderQueryProperty() updatedAt? = StringValue<OrderDirection>();

  @OrderQueryProperty() deletedAt? = StringValue<OrderDirection>();
}

@Dto()
export class BaseSelectDto {
  @Property({ type: 'boolean', transform: true }) id? = BooleanValue();
  @Property({ type: 'boolean', transform: true }) createdAt? = BooleanValue();
  @Property({ type: 'boolean', transform: true }) updatedAt? = BooleanValue();
  @Property({ type: 'boolean', transform: true }) deletedAt? = BooleanValue();
}
