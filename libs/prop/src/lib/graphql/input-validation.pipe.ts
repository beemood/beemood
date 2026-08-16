import { UnprocessableEntityException, ValidationPipe } from '@nestjs/common';
import { GraphQLError } from 'graphql';

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
        return new GraphQLError(UnprocessableEntityException.name, {
          extensions: { errors },
        });
      },
    });
  }
}
