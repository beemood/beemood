import type { Provider } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import {
  DEFAULT_PRISMA_CLIENT_DATA_SOURCE_NAME,
  getClientToken,
} from './provide-client.js';

/**
 * Create a repository token with resource name and data source name that allows us to create repositories that belongs to different data sources.
 * @param resourceName resource name
 * @param dataSourceName data source name
 * @returns repository token
 */
export function getRepositoryToken(
  resourceName: string,
  dataSourceName?: string
) {
  return `${
    dataSourceName ?? DEFAULT_PRISMA_CLIENT_DATA_SOURCE_NAME
  }_${resourceName}_REPO`;
}

/**
 * Provide repository by resource name and repository name
 * @param resourceName resource name
 * @param dataSourceName data source name
 * @returns {@link Provider}
 */
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

/**
 * Inject repository by resource name and data source name.
 * @param resourceName resource name
 * @param dataSourceName data source name
 * @returns
 */
export function InjectRepository(
  resourceName: string,
  dataSourceName?: string
): ParameterDecorator {
  return (...args) => {
    Inject(getRepositoryToken(resourceName, dataSourceName))(...args);
  };
}
