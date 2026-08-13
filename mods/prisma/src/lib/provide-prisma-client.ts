import { Inject, Provider, Type } from '@nestjs/common';
import { PoolOptions } from 'pg';
export const DEFAULT_PRISMA_CLIENT_PROFILE = 'default';

export function getPgPoolOptionsToken(
  name = '',
  profile = DEFAULT_PRISMA_CLIENT_PROFILE,
) {
  return `${name}_${profile}_PG_POOL_OPTIONS`;
}

export function providePgPoolOptions(
  useValue: PoolOptions,
  name = '',
  profile = DEFAULT_PRISMA_CLIENT_PROFILE,
): Provider {
  return {
    provide: getPgPoolOptionsToken(name, profile),
    useValue,
  };
}

export function providePgPoolOptionsFactory(
  useFactory: (...args: any[]) => PoolOptions,
  name = '',
  profile = DEFAULT_PRISMA_CLIENT_PROFILE,
): Provider {
  return {
    provide: getPgPoolOptionsToken(name, profile),
    useFactory,
  };
}

export function InjectPgPoolOptions(
  name = '',
  profile = DEFAULT_PRISMA_CLIENT_PROFILE,
): ParameterDecorator {
  return (...args) => {
    Inject(getPgPoolOptionsToken(name, profile))(...args);
  };
}

export function getPrismaClientToken(
  name: string = '',
  profile = DEFAULT_PRISMA_CLIENT_PROFILE,
) {
  return `${name}_${profile}_PRISMA_CLIENT`;
}

export function providePrismaClient(
  prismaClient: Type,
  name: string = '',
  profile = DEFAULT_PRISMA_CLIENT_PROFILE,
): Provider {
  return {
    provide: getPrismaClientToken(name, profile),
    useFactory() {
      return new prismaClient();
    },
  };
}

export function InjectPrismaClient(
  name: string = '',
  profile = DEFAULT_PRISMA_CLIENT_PROFILE,
): ParameterDecorator {
  return (...args) => {
    Inject(getPrismaClientToken(name, profile))(...args);
  };
}
