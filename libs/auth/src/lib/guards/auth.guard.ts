import {
  Inject,
  Injectable,
  type CanActivate,
  type ExecutionContext
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { extractBearerToken } from '../helpers/extract-bearer-token.js';
import { isPublicResource } from '../helpers/is-public-resource.js';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(@Inject(Reflector) protected readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext) {
    if (isPublicResource(context, this.reflector)) return true;

    const request = context.switchToHttp().getRequest();
    const bearer = extractBearerToken(context);

    request.bearer = bearer;

    return true;
  }
}
