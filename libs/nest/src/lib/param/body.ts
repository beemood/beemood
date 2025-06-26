import { Body as __Body } from '@nestjs/common';

export function Body(): ParameterDecorator {
  return (...args) => {
    __Body()(...args);
  };
}
