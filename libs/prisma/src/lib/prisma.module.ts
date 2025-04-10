import type { DynamicModule, Type } from '@nestjs/common';
import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaClient } from '@prisma/client/extension';
import { providePrismaClient } from './provide-prisma-client.js';
import {
  getPrismaDelegateToken,
  providePrismaDelegate,
} from './provide-prisma-delegate.js';

export type PrismaModuleOptions<T extends Record<string, string>> = {
  client: Type<PrismaClient>;
  models: T;
};

@Global()
@Module({
  imports: [ConfigModule],
})
export class PrismaModule {
  static configure<T extends Record<string, string>>(
    options: PrismaModuleOptions<T>
  ): DynamicModule {
    const delegateProviders = Object.keys(options.models).map(
      (delegateName) => {
        return providePrismaDelegate(delegateName.toString());
      }
    );

    const delegateTokens = Object.keys(options.models).map((e) => {
      return getPrismaDelegateToken(e);
    });

    return {
      global: true,
      module: PrismaModule,
      providers: [
        providePrismaClient({ prismaClient: options.client }),
        ...delegateProviders,
      ],
      exports: [PrismaClient, ...delegateTokens],
    };
  }
}
