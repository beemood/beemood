import { Put as __Put } from '@nestjs/common';
import type { MethodOptions } from './common-method.js';
import { CommonMethod } from './common-method.js';

export function Put(options: MethodOptions): MethodDecorator {
  return (...args) => {
    CommonMethod(options)(...args);
    __Put(options.path)(...args);
  };
}
