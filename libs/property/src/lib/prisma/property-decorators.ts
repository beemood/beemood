/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ClassType, NumberPropertyOptions } from '@bmod/types';
import { Prop } from '../property/property.js';
import { WhereDateDto, WhereNumberDto, WhereStringDto } from './where-dtos.js';

/**
 * Used for sort dto properties
 * @returns PropertyDecorator
 */
export function QryOrd(): PropertyDecorator {
  return (...args) => {
    Prop({ type: 'string', isIn: ['asc', 'desc'] })(...args);
  };
}

/**
 * @returns PropertyDecorator
 */
export function QryStr(): PropertyDecorator {
  return (...args) => {
    Prop({ type: 'object', target: () => WhereStringDto })(...args);
  };
}

/**
 * - [ ] create filter dto for WhereDateProperty
 * @returns PropertyDecorator
 */
export function QryDate(): PropertyDecorator {
  return (...args) => {
    Prop({ type: 'object', target: () => WhereDateDto })(...args);
  };
}

/**
 * - [ ] create filter dto for WhereNumberProperty
 * @returns PropertyDecorator
 */
export function QryNum(): PropertyDecorator {
  return (...args) => {
    Prop({ type: 'object', target: () => WhereNumberDto })(...args);
  };
}

/**
 * @returns PropertyDecorator
 */
export function QryBool(): PropertyDecorator {
  return (...args) => {
    Prop({ type: 'boolean', transform: true })(...args);
  };
}

/**
 * @returns PropertyDecorator
 */
export function QryObj(target: () => ClassType<object>): PropertyDecorator {
  return (...args) => {
    Prop({
      type: 'object',
      target,
      transform: true,
    })(...args);
  };
}

export function QryAndWhereProp(): PropertyDecorator {
  return (...args) => {
    Prop({
      type: 'array',
      items: {
        type: 'object',
        target: () => args[0].constructor as any,
      },
      transform: true,
    })(...args);
  };
}

export function QryOrWhereProp(): PropertyDecorator {
  return (...args) => {
    QryAndWhereProp()(...args);
  };
}

export function QryNotWhereProp(): PropertyDecorator {
  return (...args) => {
    QryAndWhereProp()(...args);
  };
}
/**
 * @returns PropertyDecorator
 */
export function QrySelect(): PropertyDecorator {
  return (...args) => {
    Prop({ type: 'boolean', transform: true })(...args);
  };
}

/**
 * @returns PropertyDecorator
 */
export function QryEnum(
  scalarFields: Record<string, string>
): PropertyDecorator {
  return (...args) => {
    Prop({
      type: 'array',
      items: {
        type: 'string',
        isIn: Object.values(scalarFields),
      },
      transform: true,
    })(...args);
  };
}

export function QryTake(
  options?: Pick<NumberPropertyOptions, 'maximum'>
): PropertyDecorator {
  return (...args) => {
    Prop({
      type: 'integer',
      minimum: 0,
      defaultValue: 20,
      maximum: options?.maximum,
      transform: true,
    })(...args);
  };
}
export function QrySkip(): PropertyDecorator {
  return (...args) => {
    Prop({ type: 'integer', minimum: 0, defaultValue: 0, transform: true })(
      ...args
    );
  };
}
