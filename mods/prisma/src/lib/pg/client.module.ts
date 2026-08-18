import { Module, type DynamicModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {
  type FeatureModuleOptions,
  type RootModuleOptions,
} from '../common/module-types.js';
import { provideAdapter } from './provide-adapter.js';
import { getClientToken, provideClient } from './provide-client.js';
import { getDelegateToken, provideDelegate } from './provide-delegate.js';
import { providePoolOptionsEnv } from './provide-pool-options.js';

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
        providePoolOptionsEnv(options.name, options.profile),
        provideAdapter(options.name, options.profile),
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
