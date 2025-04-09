import type { Type } from '@nestjs/common';
import { Inject, type Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client/extension';

export type PrismaClientProviderOptions = {
  datasourceUrl?: string;
  prismaClient: Type<PrismaClient>;
};
export function providePrismaClient(
  options: PrismaClientProviderOptions
): Provider {
  return {
    provide: PrismaClient,
    inject: [ConfigService],
    useFactory(config: ConfigService) {
      const datasourceUrl =
        options.datasourceUrl ?? config.getOrThrow('DATABASE_URL');
      const client = new options.prismaClient({ datasourceUrl });
      return client;
    },
  };
}

export function InjectPrismaClient(): ParameterDecorator {
  return (...args) => {
    Inject(PrismaClient)(...args);
  };
}
