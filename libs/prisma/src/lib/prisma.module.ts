import type { DynamicModule } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {
  getPrismaClientToken,
  getRepositoryToken,
  providePrismaClient,
  provideRepository,
} from './prisma-client-provider.js';

export type PrismaModuleOptions = {
  datasourceName?: string;
};

export type PrismaFeatureModuleOptions = PrismaModuleOptions & {
  resources: string[];
};

@Module({
  imports: [ConfigModule],
})
export class PrismaModule {
  static forRoot(options?: PrismaModuleOptions): DynamicModule {
    const { datasourceName } = options || {};
    return {
      global: true,
      module: PrismaModule,
      providers: [providePrismaClient(datasourceName)],
      exports: [getPrismaClientToken(datasourceName)],
    };
  }

  static forFeature(options: PrismaFeatureModuleOptions): DynamicModule {
    const repos = options.resources.map((e) => {
      return provideRepository(e, options.datasourceName);
    });

    const tokens = options.resources.map((e) => {
      return getRepositoryToken(e, options.datasourceName);
    });

    return {
      module: PrismaModule,
      providers: [...repos],
      exports: [...tokens],
    };
  }
}
