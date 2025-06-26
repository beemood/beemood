import { Body as __Body } from '@nestjs/common';

/**
 * Check nestjs body decorators
 */
export function Body(): ParameterDecorator {
  return (...args) => {
    __Body()(...args);
  };
}
