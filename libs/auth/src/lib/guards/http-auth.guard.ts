import {
  Injectable,
  type CanActivate,
  type ExecutionContext,
} from '@nestjs/common';

@Injectable()
export class HttpAuthGuard implements CanActivate {
  async canActivate() {
    return await new Promise<boolean>((res) => {
      setTimeout(() => {
        res(true);
      }, 2000);
    });
  }

  extract(context: ExecutionContext) {
    const [name, token] = context
      .switchToHttp()
      .getRequest()
      .authorization.split(' ');

    if (name === 'Bearer') return token;

    throw new Error('Bearer token is not found!');
  }
}
