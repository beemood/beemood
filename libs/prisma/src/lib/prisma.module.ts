import type { DynamicModule, Type } from '@nestjs/common';
import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaClient } from '@prisma/client/extension';
import { providePrismaClient } from './provide-prisma-client.js';
import {
  getPrismaDelegateToken,
  providePrismaDelegate,
} from './provide-prisma-delegate.js';

export type PrismaModuleOptions<T extends string> = {
  prismaClient: Type<PrismaClient>;
  resources: Array<T>;
};

@Global()
@Module({
  imports: [ConfigModule],
})
export class PrismaModule {
  static configure<T extends string>(
    options: PrismaModuleOptions<T>
  ): DynamicModule {
    const delegateProviders = options.resources.map((delegateName) => {
      return providePrismaDelegate(delegateName.toString());
    });

    const delegateTokens = options.resources.map((e) => {
      return getPrismaDelegateToken(e);
    });

    return {
      global: true,
      module: PrismaModule,
      providers: [
        providePrismaClient({ prismaClient: options.prismaClient }),
        ...delegateProviders,
      ],
      exports: [PrismaClient, ...delegateTokens],
    };
  }
}
