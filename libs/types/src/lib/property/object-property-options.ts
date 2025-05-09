 
import type { ClassType } from '../class/class-type.js';
import type { CommonPropertyOptions } from './common-property-options.js';

export type ObjectPropertyOptions<T extends object = object> = {
  type: 'object';
  target: () => ClassType<T>;
  defaultValue?: T;
} & CommonPropertyOptions<T>;
