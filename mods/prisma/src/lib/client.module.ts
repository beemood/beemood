import { DynamicModule, Module, Type } from '@nestjs/common';
import { getClientToken, provideClient } from './provide-client.js';

export type ModuleCommonOptions = {
  name?: string;
  profile?: string;
};

export type RootModuleOptions = {
  prismaClient: Type;
} & ModuleCommonOptions;

export type FeatureModuleOptions = {
  models: string[];
} & ModuleCommonOptions;

@Module({ imports: [], controllers: [], providers: [] })
export class ClientModule {
  static forRoot(options: RootModuleOptions): DynamicModule {
    return {
      module: ClientModule,
      providers: [
        provideClient(options.prismaClient, options.name, options.profile),
      ],
      exports: [getClientToken(options.name, options.profile)],
    };
  }
  static forFeature(options: FeatureModuleOptions): DynamicModule {
    // const repositoryProviders = options.models.map(modelName=>provid)
    return {
      module: ClientModule,
      providers: [],
    };
  }
}
