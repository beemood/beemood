import { CLASS_TRANSFORM_OPTIONS } from '@beemood/prop-validation';
import {
  Provider,
  UnprocessableEntityException,
  ValidationPipe,
} from '@nestjs/common';
import { APP_PIPE, NestApplication } from '@nestjs/core';

export const GlobalValidationPipe = new ValidationPipe({
  transformOptions: { ...CLASS_TRANSFORM_OPTIONS },
  validationError: { target: false, value: false },
  exceptionFactory(errors) {
    throw new UnprocessableEntityException({ errors });
  },
});

export function provideGlobalValidationPipe(): Provider {
  return {
    provide: APP_PIPE,
    useValue: GlobalValidationPipe,
  };
}

export function useGlobalValidationPipe(app: NestApplication) {
  app.useGlobalPipes(GlobalValidationPipe);
}
