import { Delete as __Delete } from '@nestjs/common';
import type { MethodOptions } from './common-method.js';
import { CommonMethod } from './common-method.js';

export function Delete(options: MethodOptions): MethodDecorator {
  return (...args) => {
    CommonMethod(options)(...args);
    __Delete(options.path)(...args);
  };
}
