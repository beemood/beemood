import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * Inject current user session's userId
 * @returns ParameterDecorator
 */
export const ParamUserId = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    return context.switchToHttp().getRequest().session.userId;
  }
);
