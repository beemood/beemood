import type { OrderDirection } from '@bmod/types';
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
  @Property({ type: 'integer', transform: true, minimum: 1 }) take?: number;
  @Property({ type: 'integer', transform: true, minimum: 0 }) skip?: number;
}

@Dto()
export class BaseWhereQueryDto {
  @NumberQueryProperty()
  id?: NumberQueryDto | number;

  @DateQueryProperty()
  createdAt?: DateQueryDto | Date;

  @DateQueryProperty()
  updatedAt?: DateQueryDto | Date;

  @DateQueryProperty()
  deletedAt?: DateQueryDto | Date;
}

@Dto()
export class BaseOrderDto {
  @OrderQueryProperty() id?: OrderDirection;

  @OrderQueryProperty() createdAt?: OrderDirection;

  @OrderQueryProperty() updatedAt?: OrderDirection;

  @OrderQueryProperty() deletedAt?: OrderDirection;
}

@Dto()
export class BaseSelectDto {
  @Property({ type: 'boolean', transform: true }) id?: boolean;

  @Property({ type: 'boolean', transform: true }) createdAt?: boolean;

  @Property({ type: 'boolean', transform: true }) updatedAt?: boolean;

  @Property({ type: 'boolean', transform: true }) deletedAt?: boolean;
}
