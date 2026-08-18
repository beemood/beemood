import { Env } from '@beemood/constants';
import { type Provider, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { type PoolOptions } from 'pg';
import {
  DEFAULT_PRISMA_CLIENT_NAME,
  DEFAULT_PRISMA_CLIENT_PROFILE,
} from './constants.js';
import { getPgPoolOptionsToken } from './provide-pg-pool-options.js';

export function getPgAdapterToken(
  name = DEFAULT_PRISMA_CLIENT_NAME,
  profile = DEFAULT_PRISMA_CLIENT_PROFILE,
) {
  return `${name}_${profile}_PG_ADAPTER`;
}

/**
 * Provides pg adapter.
 *
 * @param name
 * @param profile
 * @returns
 */
export function providePgAdapter(
  name = DEFAULT_PRISMA_CLIENT_NAME,
  profile = DEFAULT_PRISMA_CLIENT_PROFILE,
): Provider {
  return {
    inject: [ConfigService, getPgPoolOptionsToken(name, profile)],
    provide: getPgAdapterToken(name, profile),
    useFactory(config: ConfigService, options: PoolOptions) {
      const schema = config.get(Env.DB.SCHEMA);
      return new PrismaPg(options, { schema });
    },
  };
}

export function InjectPgAdapter(
  name = DEFAULT_PRISMA_CLIENT_NAME,
  profile = DEFAULT_PRISMA_CLIENT_PROFILE,
): ParameterDecorator {
  return (...args) => {
    Inject(getPgAdapterToken(name, profile))(...args);
  };
}
