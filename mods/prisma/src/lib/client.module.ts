import { type RequiredProperties } from '@beemood/types';
import { type DynamicModule, Module, type Type } from '@nestjs/common';
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
  client: () => Type;
  features?: Type[];
} & ModuleCommonOptions;

export type FeatureModuleOptions = RequiredProperties<
  ModuleCommonOptions,
  'models'
>;

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
      imports: [...(options.features ?? [])],
      providers: [
        providePgPoolOptionsEnv(options.name, options.profile),
        providePgAdapter(options.name, options.profile),
        provideClient(options.client, options.name, options.profile),
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
      imports: [ClientModule],
      providers: [...delegates[0]],
      exports: [...delegates[1]],
    };
  }
}
