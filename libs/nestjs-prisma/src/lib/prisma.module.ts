import { Any } from '@beemood/types';
import { DynamicModule, Module, Provider, Type } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { getClientToken, provideClientFactory } from './provide-client.js';
import {
  getReposiitoryToken,
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
    const providers: Provider[] = resourceNames.map((resourceName) => {
      return provideRepositoryFactory(
        resourceName,
        (client: Any) => {
          return client[resourceName];
        },
        [getClientToken()]
      );
    });

    const exports = resourceNames.map(getReposiitoryToken);

    return {
      module: PrismaModule,
      providers: [...providers],
      exports: [...exports],
    };
  }
}
