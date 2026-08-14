import { DynamicModule, Module, Type } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { getClientToken, provideClient } from './provide-client.js';
import { getDelegateToken, provideDelegate } from './provide-delegate.js';
import { providePgAdapter } from './provide-pg-adapter.js';
import { providePgPoolOptionsEnv } from './provide-pg-pool-options.js';

export type ModuleCommonOptions = {
  name?: string;
  profile?: string;
  models?: string[];
};

export type RootModuleOptions = {
  prismaClient: Type;
} & ModuleCommonOptions;

export type FeatureModuleOptions = {
  models: string[];
} & ModuleCommonOptions;

@Module({ imports: [ConfigModule] })
export class ClientModule {
  static forRoot(options: RootModuleOptions): DynamicModule {
    const delegates =
      options.models?.reduce(
        (acc, modelName) => {
          acc[0].push(
            provideDelegate(modelName, options.name, options.profile),
          );
          acc[1].push(
            getDelegateToken(modelName, options.name, options.profile),
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

  static forFeature(options: FeatureModuleOptions): DynamicModule {
    const delegates = options.models.reduce(
      (acc, modelName) => {
        acc[0].push(provideDelegate(modelName, options.name, options.profile));
        acc[1].push(getDelegateToken(modelName, options.name, options.profile));

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
