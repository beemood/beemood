import { Inject, type Provider, type Type } from '@nestjs/common';
import {
  DEFAULT_PRISMA_CLIENT_NAME,
  DEFAULT_PRISMA_CLIENT_PROFILE,
} from '../common/constants.js';

import { type PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import { getAdapterToken } from './provide-adapter.js';

export function getClientToken(
  name = DEFAULT_PRISMA_CLIENT_NAME,
  profile = DEFAULT_PRISMA_CLIENT_PROFILE,
): string {
  return `${name}_${profile}_SQLITE_CLIENT_TOKEN`;
}

export function provideClient(
  prismaClient: () => Type,
  name = DEFAULT_PRISMA_CLIENT_NAME,
  profile = DEFAULT_PRISMA_CLIENT_PROFILE,
): Provider {
  return {
    inject: [getAdapterToken(name, profile)],
    provide: getClientToken(name, profile),
    useFactory(adapter: PrismaBetterSqlite3) {
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
