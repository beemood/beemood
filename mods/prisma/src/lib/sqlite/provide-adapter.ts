import { Inject, type Provider } from '@nestjs/common';
import {
  DEFAULT_PRISMA_CLIENT_NAME,
  DEFAULT_PRISMA_CLIENT_PROFILE,
} from '../common/constants.js';

import { Env } from '@beemood/constants';
import { ConfigService } from '@nestjs/config';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import { configureBetterSqlite3 } from './configure-sqlite.js';

export function getAdapterToken(
  name = DEFAULT_PRISMA_CLIENT_NAME,
  profile = DEFAULT_PRISMA_CLIENT_PROFILE,
): string {
  return `${name}_${profile}_SQLITE_ADAPTER`;
}

export function provideAdapter(
  name = DEFAULT_PRISMA_CLIENT_NAME,
  profile = DEFAULT_PRISMA_CLIENT_PROFILE,
): Provider {
  return {
    inject: [ConfigService],
    provide: getAdapterToken(name, profile),
    useFactory(config: ConfigService) {
      const dbPath = config.getOrThrow(Env.DB.URL);
      const dbConfig = configureBetterSqlite3({ dbPath });
      return new PrismaBetterSqlite3(dbConfig as any);
    },
  };
}

export function InjectAdapter(
  name = DEFAULT_PRISMA_CLIENT_NAME,
  profile = DEFAULT_PRISMA_CLIENT_PROFILE,
): ParameterDecorator {
  return (...args) => {
    Inject(getAdapterToken(name, profile))(...args);
  };
}
