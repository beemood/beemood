import type { Provider } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import {
  DEFAULT_PRISMA_CLIENT_DATA_SOURCE_NAME,
  getClientToken,
} from './provide-client.js';

export function getRepositoryToken(
  resourceName: string,
  dataSourceName?: string
) {
  return `${
    dataSourceName ?? DEFAULT_PRISMA_CLIENT_DATA_SOURCE_NAME
  }_${resourceName}_REPO`;
}

export function provideRepository(
  resourceName: string,
  dataSourceName?: string
): Provider {
  return {
    inject: [getClientToken(dataSourceName)],
    provide: getRepositoryToken(resourceName, dataSourceName),
    useFactory(client: any) {
      return client[resourceName];
    },
  };
}

export function InjectRepository(
  resourceName: string,
  dataSourceName?: string
): ParameterDecorator {
  return (...args) => {
    Inject(getRepositoryToken(resourceName, dataSourceName))(...args);
  };
}
