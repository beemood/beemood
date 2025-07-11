import { ApiInternalServerErrorResponse } from '@nestjs/swagger';
import { PublicMethod } from './public-method.js';

export type CommonMethodOptions = {
  public?: boolean;
};

export function CommonMethod(options: CommonMethodOptions): MethodDecorator {
  return (...args) => {
    if (options.public) {
      PublicMethod()(...args);
    }

    ApiInternalServerErrorResponse()(...args);
  };
}
