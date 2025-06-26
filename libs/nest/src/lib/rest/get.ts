import { Get as __Get } from '@nestjs/common';
import type { MethodOptions } from './common-method.js';
import { CommonMethod } from './common-method.js';

export function Get(options: MethodOptions): MethodDecorator {
  return (...args) => {
    CommonMethod(options)(...args);
    __Get(options.path)(...args);
  };
}
