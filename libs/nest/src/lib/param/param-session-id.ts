import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * Inject the current session's id
 * @returns ParameterDecorator
 */
export const ParamSessionId = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    return context.switchToHttp().getRequest().session.id;
  }
);
