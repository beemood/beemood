import { Post as __Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { PublicMethod } from '../metadata/public.js';
import type { MethodOptions } from './common-method.js';

export function Post(options: MethodOptions): MethodDecorator {
  return (...args) => {
    __Post(options.path)(...args);
    ApiOperation({ summary: options.summary })(...args);
    if (options.public === true) {
      PublicMethod()(...args);
    } else {
      ApiBearerAuth(options.bearer)(...args);
    }
  };
}
