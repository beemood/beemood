import { UnauthorizedException, type ExecutionContext } from '@nestjs/common';

export function extractBearerToken(context: ExecutionContext) {
  const [bearer, token] = context
    .switchToHttp()
    .getRequest()
    .authorization.split(' ');

  if (bearer === 'Bearer') return token;

  throw new UnauthorizedException('Bearer token is not provided');
}
