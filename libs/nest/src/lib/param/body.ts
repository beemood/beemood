import { Body as __Body } from '@nestjs/common';

/**
 * Inject request body
 * @returns ParameterDecorator
 */
export function Body(): ParameterDecorator {
  return (...args) => {
    __Body()(...args);
  };
}
