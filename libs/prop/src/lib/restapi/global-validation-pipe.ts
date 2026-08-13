import { UnprocessableEntityException, ValidationPipe } from '@nestjs/common';

export const GlobalValidationPipe = new ValidationPipe({
  transformOptions: {
    excludeExtraneousValues: true,
    exposeUnsetFields: false,
    strategy: 'excludeAll',
  },
  validationError: { target: false, value: false },
  exceptionFactory(errors) {
    throw new UnprocessableEntityException({ errors });
  },
});
