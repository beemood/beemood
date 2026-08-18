import { Env } from '@beemood/constants';
import { type Provider, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { type PoolOptions } from 'pg';
import {
  DEFAULT_PRISMA_CLIENT_NAME,
  DEFAULT_PRISMA_CLIENT_PROFILE,
} from '../common/constants.js';
import { getPoolOptionsToken } from './provide-pool-options.js';

export function getAdapterToken(
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
export function provideAdapter(
  name = DEFAULT_PRISMA_CLIENT_NAME,
  profile = DEFAULT_PRISMA_CLIENT_PROFILE,
): Provider {
  return {
    inject: [ConfigService, getPoolOptionsToken(name, profile)],
    provide: getAdapterToken(name, profile),
    useFactory(config: ConfigService, options: PoolOptions) {
      const schema = config.get(Env.DB.SCHEMA);
      return new PrismaPg(options, { schema });
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
