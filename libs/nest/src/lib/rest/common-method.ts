import type { Type } from '@nestjs/common';
import type { ApiResponseOptions } from '@nestjs/swagger';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PublicMethod } from '../metadata/public.js';

export type MethodOptions = {
  path?: string;
  summary?: string;
  public?: boolean;
  bearer?: string;
  response?: ApiResponseOptions;
  responseDto?: Type | Type[];
};

export function CommonMethod(options: MethodOptions): MethodDecorator {
  return (...args) => {
    
    ApiOperation({ summary: options.summary })(...args);
    
    if (options.public === true) {
      PublicMethod()(...args);
    } else {
      ApiBearerAuth(options.bearer)(...args);
    }

    if (options.response) {
      ApiResponse(options.response)(...args);
    }
  };
}
