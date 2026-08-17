import { type RequiredProperties } from '@beemood/types';
import { type DynamicModule, Module, type Type } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { getClientToken, provideClient } from './provide-client.js';
import { getDelegateToken, provideDelegate } from './provide-delegate.js';
import { providePgAdapter } from './provide-pg-adapter.js';
import { providePgPoolOptionsEnv } from './provide-pg-pool-options.js';

export type ModuleCommonOptions<ModelName extends string> = {
  name?: string;
  profile?: string;
  models?: ModelName[];
};

export type RootModuleOptions<
  PrismaClient extends object,
  ModelName extends string & keyof PrismaClient,
> = {
  prismaClient: Type<PrismaClient>;
} & ModuleCommonOptions<ModelName>;

export type FeatureModuleOptions<
  PrismaClient extends object,
  ModelName extends string & keyof PrismaClient,
> = RequiredProperties<ModuleCommonOptions<ModelName>, 'models'>;

@Module({ imports: [ConfigModule] })
export class ClientModule {
  static forRoot<
    PrismaClient extends object,
    ModelName extends string & keyof PrismaClient,
  >(options: RootModuleOptions<PrismaClient, ModelName>): DynamicModule {
    const delegates =
      options.models?.reduce(
        (acc, modelName) => {
          acc[0].push(
            provideDelegate<PrismaClient, ModelName>(
              modelName,
              options.name,
              options.profile,
            ),
          );
          acc[1].push(
            getDelegateToken<ModelName>(
              modelName,
              options.name,
              options.profile,
            ),
          );

          return acc;
        },
        [[], []] as any,
      ) ?? [];
    return {
      module: ClientModule,
      global: true,
      providers: [
        providePgPoolOptionsEnv(options.name, options.profile),
        providePgAdapter(options.name, options.profile),
        provideClient(options.prismaClient, options.name, options.profile),
        ...(delegates[0] ?? []),
      ],
      exports: [
        getClientToken(options.name, options.profile),
        ...(delegates[1] ?? []),
      ],
    };
  }

  static forFeature<
    PrismaClient extends object,
    ModelName extends string & keyof PrismaClient,
  >(options: FeatureModuleOptions<PrismaClient, ModelName>): DynamicModule {
    const delegates = options.models.reduce(
      (acc, modelName) => {
        acc[0].push(
          provideDelegate<PrismaClient, ModelName>(
            modelName,
            options.name,
            options.profile,
          ),
        );
        acc[1].push(
          getDelegateToken<ModelName>(modelName, options.name, options.profile),
        );

        return acc;
      },
      [[], []] as any,
    );

    return {
      module: ClientModule,
      providers: [...delegates[0]],
      exports: [...delegates[1]],
    };
  }
}
