import { Duration, Env } from '@beemood/constants';
import { type Provider, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { type PoolOptions } from 'pg';
import {
  DEFAULT_PRISMA_CLIENT_NAME,
  DEFAULT_PRISMA_CLIENT_PROFILE,
} from './constants.js';

export function getPgPoolOptionsToken(
  name = DEFAULT_PRISMA_CLIENT_NAME,
  profile = DEFAULT_PRISMA_CLIENT_PROFILE,
) {
  return `${name}_${profile}_PG_POOL_OPTIONS`;
}

export function providePgPoolOptions(
  useValue: PoolOptions,
  name = DEFAULT_PRISMA_CLIENT_NAME,
  profile = DEFAULT_PRISMA_CLIENT_PROFILE,
): Provider {
  return {
    provide: getPgPoolOptionsToken(name, profile),
    useValue,
  };
}

export function providePgPoolOptionsFactory(
  useFactory: (config: ConfigService) => PoolOptions,
  name = DEFAULT_PRISMA_CLIENT_NAME,
  profile = DEFAULT_PRISMA_CLIENT_PROFILE,
): Provider {
  return {
    provide: getPgPoolOptionsToken(name, profile),
    inject: [ConfigService],
    useFactory,
  };
}

export function providePgPoolOptionsEnv(
  name = DEFAULT_PRISMA_CLIENT_NAME,
  profile = DEFAULT_PRISMA_CLIENT_PROFILE,
): Provider {
  return {
    inject: [ConfigService],
    provide: getPgPoolOptionsToken(name, profile),
    useFactory(config: ConfigService) {
      const connectionString = config.getOrThrow(Env.DB.URL);

      const max = config.get(Env.DB.POOL.MAX, 20);

      const connectionTimeoutMillis = config.get(
        Env.DB.POOL.CONNECTION_TIMEOUT_MILLIS,
        Duration.secs(5),
      );

      const idleTimeoutMillis = config.get(
        Env.DB.POOL.IDLE_TIMEOUT_MILLIS,
        Duration.secs(10),
      );

      const maxUses = config.get(Env.DB.POOL.MAX_USES, 7_500);

      const statement_timeout = config.get(
        Env.DB.POOL.STATEMENT_TIMEOUT,
        Duration.secs(5),
      );

      const query_timeout = config.get(
        Env.DB.POOL.QUERY_TIMEOUT,
        Duration.secs(3),
      );

      const lock_timeout = config.get(
        Env.DB.POOL.LOCK_TIMEOUT,
        Duration.secs(10),
      );

      return {
        connectionString,
        max,
        connectionTimeoutMillis,
        idleTimeoutMillis,
        maxUses,
        statement_timeout,
        query_timeout,
        lock_timeout,
      } as PoolOptions;
    },
  };
}

export function provideDefaultPgPoolOptions(
  name = DEFAULT_PRISMA_CLIENT_NAME,
  profile = DEFAULT_PRISMA_CLIENT_PROFILE,
): Provider {
  return {
    inject: [ConfigService],
    provide: getPgPoolOptionsToken(name, profile),
    useFactory(config: ConfigService) {
      const connectionString = config.getOrThrow(Env.DB.URL);

      return {
        connectionString,
        max: 20,
        connectionTimeoutMillis: Duration.secs(5),
        idleTimeoutMillis: Duration.secs(10),
        maxUses: 7_500,
        statement_timeout: 5_000,
        query_timeout: 3_000,
        lock_timeout: 10_000,
      } as PoolOptions;
    },
  };
}

export function InjectPgPoolOptions(
  name = DEFAULT_PRISMA_CLIENT_NAME,
  profile = DEFAULT_PRISMA_CLIENT_PROFILE,
): ParameterDecorator {
  return (...args) => {
    Inject(getPgPoolOptionsToken(name, profile))(...args);
  };
}
