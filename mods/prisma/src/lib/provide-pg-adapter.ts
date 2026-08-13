import { Env } from '@beemood/constants';
import { Inject, Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PoolOptions } from 'pg';
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
