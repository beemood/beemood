import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * Inject the current user session
 * @returns ParameterDecorator
 */
export const ParamSession = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    return context.switchToHttp().getRequest().session;
  }
);
