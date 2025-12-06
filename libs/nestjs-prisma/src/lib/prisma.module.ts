import { names } from '@beemood/names';
import { Any } from '@beemood/types';
import { DynamicModule, Module, Provider, Type } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { getClientToken, provideClientFactory } from './provide-client.js';
import {
  getRepositoryToken,
  provideRepositoryFactory,
} from './provide-repository.js';

@Module({
  imports: [ConfigModule],
})
export class PrismaModule {
  static forRoot(prismaClientClass: Type): DynamicModule {
    return {
      module: PrismaModule,
      providers: [
        provideClientFactory(
          (config: ConfigService) => {
            const connectionString = config.getOrThrow('DATABASE_URL');
            const adapter = new PrismaPg({ connectionString });
            const client = new prismaClientClass({ adapter });
            return client;
          },
          [ConfigService]
        ),
      ],
      exports: [getClientToken()],
      global: true,
    };
  }

  static forFeature(resourceNames: string[]): DynamicModule {
    const resourceNameNames = resourceNames.map(names);
    const providers: Provider[] = resourceNameNames.map(({ pascal, camel }) => {
      return provideRepositoryFactory(
        pascal,
        (client: Any) => {
          return client[camel];
        },
        [getClientToken()]
      );
    });

    const exports = resourceNameNames.map(({ pascal }) =>
      getRepositoryToken(pascal)
    );

    return {
      module: PrismaModule,
      providers: [...providers],
      exports: [...exports],
    };
  }
}
