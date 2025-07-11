import { Get as __Get, Type } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { CommonMethod, CommonMethodOptions } from './common-method.js';

export type GetOptions = {
  returnType: Type;
} & CommonMethodOptions;

export function FindAll(options: GetOptions): MethodDecorator {
  return (...args) => {
    CommonMethod({ public: options.public })(...args);
    __Get()(...args);
    ApiOperation({ summary: `Find all` })(...args);
    ApiOkResponse({ type: options.returnType, isArray: true })(...args);
  };
}
