import { UnprocessableEntityException, ValidationPipe } from '@nestjs/common';

export class InputValidationPipe extends ValidationPipe {
  constructor() {
    super({
      transform: true,
      transformOptions: {
        excludeExtraneousValues: true,
        exposeUnsetFields: false,
        exposeDefaultValues: true,
      },
      exceptionFactory(errors) {
        return new UnprocessableEntityException({ errors });
      },
    });
  }
}
