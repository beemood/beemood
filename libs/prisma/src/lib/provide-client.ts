/* eslint-disable @typescript-eslint/no-explicit-any */
import { Inject, type Provider, type Type } from '@nestjs/common';

export const DEFAULT_PRISMA_CLIENT_DATA_SOURCE_NAME = 'default';

/**
 * Create a token with data source name that allows us to create multiple data sources
 * @param dataSourceName
 * @returns
 */
export function getClientToken(dataSourceName?: string): string {
  return `${
    dataSourceName ?? DEFAULT_PRISMA_CLIENT_DATA_SOURCE_NAME
  }_PrismaClient`;
}

/**
 * Provide prisma client instance
 * @param prismaClient prisma client instance. Check prisma orm for more information
 * @param dataSourceName
 * @returns
 */
export function provideClient(
  prismaClient: Type<any>,
  dataSourceName?: string
): Provider {
  return {
    provide: getClientToken(dataSourceName),
    useValue: new prismaClient(),
  };
}

/**
 * Inject prisma client instance in working class
 * @param dataSourceName data source name
 * @returns
 */
export function InjectClient(dataSourceName?: string): ParameterDecorator {
  return (...args) => {
    Inject(getClientToken(dataSourceName))(...args);
  };
}
