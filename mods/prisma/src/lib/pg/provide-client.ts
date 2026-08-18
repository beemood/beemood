import { Inject, type Provider, type Type } from '@nestjs/common';
import { type PrismaPg } from '@prisma/adapter-pg';
import {
  DEFAULT_PRISMA_CLIENT_NAME,
  DEFAULT_PRISMA_CLIENT_PROFILE,
} from '../common/constants.js';
import { getAdapterToken } from './provide-adapter.js';
export function getClientToken(
  name = DEFAULT_PRISMA_CLIENT_NAME,
  profile = DEFAULT_PRISMA_CLIENT_PROFILE,
) {
  return `${name}_${profile}_PRISMA_CLIENT`;
}

export function provideClient(
  prismaClient: () => Type,
  name = DEFAULT_PRISMA_CLIENT_NAME,
  profile = DEFAULT_PRISMA_CLIENT_PROFILE,
): Provider {
  return {
    inject: [getAdapterToken(name, profile)],
    provide: getClientToken(name, profile),
    useFactory(adapter: PrismaPg) {
      return new (prismaClient())({ adapter });
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
