import { Config } from '@bmod/types';
import type { Provider } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

export function getPrismaClientToken(datasourceName = 'default') {
  return `${datasourceName}_PRISMA_CLIENT_TOKEN`;
}

export function InjectPrismaClient(
  datasourceName = 'default'
): ParameterDecorator {
  return (...args) => {
    Inject(getPrismaClientToken(datasourceName))(...args);
  };
}

/**
 * Provide prisma datasource client instance
 * @param datasourceName resource name ( 'default' by default )
 * @returns Nestjs provider
 */
export function providePrismaClient(datasourceName = 'default'): Provider {
  return {
    inject: [ConfigService],
    provide: getPrismaClientToken(datasourceName),
    useFactory(config: ConfigService) {
      const datasourceUrl = config.getOrThrow(Config.DATABASE_URL);
      const client = new PrismaClient({ datasourceUrl });
      return client;
    },
  };
}

export function getRepositoryToken(
  resourceName: string,
  datasourceName = 'default'
) {
  return `${datasourceName}_${resourceName}_REPOSITORY_TOKEN`;
}

export function provideRepository(
  resourceName: string,
  datasourceName = 'default'
): Provider {
  return {
    inject: [getPrismaClientToken(datasourceName)],
    provide: getRepositoryToken(resourceName, datasourceName),
    useFactory(client: PrismaClient) {
      const repository = (client as any)[resourceName];
      if (!repository) {
        throw new Error(
          `${resourceName} does not exist in the ${datasourceName} prisma client!`
        );
      }
      return repository;
    },
  };
}

export function InjectRepo(
  resourceName: string,
  datasourceName = 'default'
): ParameterDecorator {
  return (...args) => {
    Inject(getRepositoryToken(resourceName, datasourceName))(...args);
  };
}
