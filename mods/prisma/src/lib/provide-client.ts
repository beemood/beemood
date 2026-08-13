import { Inject, Provider, Type } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import {
  DEFAULT_PRISMA_CLIENT_NAME,
  DEFAULT_PRISMA_CLIENT_PROFILE,
} from './constants.js';
import { getPgAdapterToken } from './provide-pg-adapter.js';
export function getClientToken(
  name = DEFAULT_PRISMA_CLIENT_NAME,
  profile = DEFAULT_PRISMA_CLIENT_PROFILE,
) {
  return `${name}_${profile}_PRISMA_CLIENT`;
}

export function provideClient(
  prismaClient: Type,
  name = DEFAULT_PRISMA_CLIENT_NAME,
  profile = DEFAULT_PRISMA_CLIENT_PROFILE,
): Provider {
  return {
    inject: [getPgAdapterToken(name, profile)],
    provide: getClientToken(name, profile),
    useFactory(adapter: PrismaPg) {
      return new prismaClient({ adapter });
    },
  };
}

export function InjectClient(
  name = DEFAULT_PRISMA_CLIENT_NAME,
  profile = DEFAULT_PRISMA_CLIENT_PROFILE,
): ParameterDecorator {
  return (...args) => {
    Inject(getClientToken(name, profile))(...args);
  };
}
