import type { ClassType } from '../../types/class-type.js';
import type { CommonOptions } from '../common/common-options.js';

export type ObjectOptions<T = unknown> = {
  type: 'object';
  target: () => ClassType<T>;
} & CommonOptions<T>;
