import { Query as __Query } from '@nestjs/common';

/**
 * Inject the url query params
 * @returns ParameterDecorator
 */
export function Query(): ParameterDecorator {
  return (...args) => {
    __Query()(...args);
  };
}
