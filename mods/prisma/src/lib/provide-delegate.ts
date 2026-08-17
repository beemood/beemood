import { type StrictConstructorParameterDecorator } from '@beemood/types';
import { extractResourceName, names } from '@beemood/utils';
import { Inject, type Provider } from '@nestjs/common';
import {
  DEFAULT_PRISMA_CLIENT_NAME,
  DEFAULT_PRISMA_CLIENT_PROFILE,
} from './constants.js';
import { getClientToken } from './provide-client.js';

export function getDelegateToken<ModelName extends string>(
  modelName: ModelName,
  name = DEFAULT_PRISMA_CLIENT_NAME,
  profile = DEFAULT_PRISMA_CLIENT_PROFILE,
) {
  return `${names(modelName).contant}_${name}_${profile}_PRISMA_DELEGATE`;
}

export function provideDelegate<
  PrismaClient extends object,
  ModelName extends string & keyof PrismaClient,
>(
  modelName: ModelName,
  name = DEFAULT_PRISMA_CLIENT_NAME,
  profile = DEFAULT_PRISMA_CLIENT_PROFILE,
): Provider {
  return {
    inject: [getClientToken(name, profile)],
    provide: getDelegateToken<ModelName>(modelName, name, profile),
    useFactory(client: PrismaClient) {
      return client[names(modelName).camel as ModelName];
    },
  };
}

export function InjectDelegate(
  modelName?: string,
  name = DEFAULT_PRISMA_CLIENT_NAME,
  profile = DEFAULT_PRISMA_CLIENT_PROFILE,
): StrictConstructorParameterDecorator {
  return (...args) => {
    modelName ??= extractResourceName(args[0].name);
    modelName = names(modelName).camel;

    Inject(getDelegateToken(modelName, name, profile))(...args);
  };
}
