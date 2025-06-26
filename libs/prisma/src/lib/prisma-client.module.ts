import type { DynamicModule, Type } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { getClientToken, provideClient } from './provide-client.js';
import { getRepositoryToken, provideRepository } from './provide-repository.js';

export type PrismaClientRootOptions = {
  client: Type<any>;
  dataSourceName?: string;
};

export type PrismClientFeatureOptions = {
  dataSourceName?: string;
  resourceNames: string[];
};

/**
 * Prisma module provides PrismaClient instance and repositories
 */
@Module({})
export class PrismaClientModule {
  /**
   * Provides a global prisma client instance
   * @param options {@link PrismaClientRootOptions}
   * @returns
   */
  static forRoot(options: PrismaClientRootOptions): DynamicModule {
    return {
      global: true,
      module: PrismaClientModule,
      providers: [provideClient(options.client, options.dataSourceName)],
      exports: [getClientToken(options.dataSourceName)],
    };
  }

  /**
   * Provides prisma repositories for the imported module.
   * @param options {@link PrismClientFeatureOptions}
   * @returns
   */
  static forFeature(options: PrismClientFeatureOptions): DynamicModule {
    const providers = options.resourceNames.map((r) => {
      return provideRepository(r, options.dataSourceName);
    });

    const exports = options.resourceNames.map((r) => {
      return getRepositoryToken(r, options.dataSourceName);
    });

    return {
      module: PrismaClientModule,
      providers,
      exports,
    };
  }
}
