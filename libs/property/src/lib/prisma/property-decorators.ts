/* eslint-disable @typescript-eslint/no-explicit-any */
import { Property } from '../property/property.js';
import { WhereNumberDto, WhereStringDto } from './where-dtos.js';

/**
 * Used for sort dto properties
 * @returns PropertyDecorator
 */
export function OrderProperty(): PropertyDecorator {
  return (...args) => {
    Property({ type: 'string', isIn: ['asc', 'desc'] })(...args);
  };
}

/**
 * @returns PropertyDecorator
 */
export function WhereStringProperty(): PropertyDecorator {
  return (...args) => {
    Property({ type: 'object', target: () => WhereStringDto })(...args);
  };
}

/**
 * - [ ] create filter dto for WhereDateProperty
 * @returns PropertyDecorator
 */
export function WhereDateProperty(): PropertyDecorator {
  return (...args) => {
    Property({ type: 'object', target: () => WhereStringDto })(...args);
  };
}

/**
 * - [ ] create filter dto for WhereNumberProperty
 * @returns PropertyDecorator
 */
export function WhereNumberProperty(): PropertyDecorator {
  return (...args) => {
    Property({ type: 'object', target: () => WhereNumberDto })(...args);
  };
}

/**
 * @returns PropertyDecorator
 */
export function WhereBooleanProperty(): PropertyDecorator {
  return (...args) => {
    Property({ type: 'boolean' })(...args);
  };
}

/**
 * @returns PropertyDecorator
 */
export function WhereDtoProperty(): PropertyDecorator {
  return (...args) => {
    Property({
      type: 'array',
      items: { type: 'object', target: () => args[0] as any },
    })(...args);
  };
}

/**
 * @returns PropertyDecorator
 */
export function SelectProperty(): PropertyDecorator {
  return (...args) => {
    Property({ type: 'boolean' })(...args);
  };
}
