import { Inject, type Provider } from '@nestjs/common';
import { PrismaClient } from '@prisma/client/extension';

export function getPrismaDelegateToken(delegateName: string) {
  return `${delegateName}_DELEGATE_TOKEN`;
}

export function providePrismaDelegate(delegateName: string): Provider {
  return {
    inject: [PrismaClient],
    provide: getPrismaDelegateToken(delegateName),
    useFactory(client: PrismaClient) {
      return client[
        delegateName
          .split('')
          .map((v, i) => (i === 0 ? v.toLowerCase() : v))
          .join('')
      ];
    },
  };
}

export function InjectDelegate(delegateName: string): ParameterDecorator {
  return (...args) => {
    Inject(getPrismaDelegateToken(delegateName))(...args);
  };
}
