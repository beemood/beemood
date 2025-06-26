/* eslint-disable @typescript-eslint/no-explicit-any */
import { Inject, type Provider, type Type } from '@nestjs/common';

export const DEFAULT_PRISMA_CLIENT_DATA_SOURCE_NAME = 'default';

export function getClientToken(dataSourceName?: string): string {
  return `${
    dataSourceName ?? DEFAULT_PRISMA_CLIENT_DATA_SOURCE_NAME
  }_PrismaClient`;
}

export function provideClient(
  prismaClient: Type<any>,
  dataSourceName?: string
): Provider {
  return {
    provide: getClientToken(dataSourceName),
    useValue: new prismaClient(),
  };
}

export function InjectClient(dataSourceName?: string): ParameterDecorator {
  return (...args) => {
    Inject(getClientToken(dataSourceName))(...args);
  };
}
