import { DateQueryDto } from '../dtos/date-query.dto.js';
import { NumberQueryDto } from '../dtos/number-query.dto.js';
import { StringQueryDto } from '../dtos/string-query.dto.js';
import { Property } from './property.decorator.js';

export function StringQueryProperty(): PropertyDecorator {
  return (...args) => {
    Property({ type: 'object', target: () => StringQueryDto })(...args);
  };
}

export function NumberQueryProperty(): PropertyDecorator {
  return (...args) => {
    Property({ type: 'object', target: () => NumberQueryDto })(...args);
  };
}

export function DateQueryProperty(): PropertyDecorator {
  return (...args) => {
    Property({ type: 'object', target: () => DateQueryDto })(...args);
  };
}

export function OrderQueryProperty(): PropertyDecorator {
  return (...args) => {
    Property({ type: 'string', isIn: ['asc', 'desc'] })(...args);
  };
}
