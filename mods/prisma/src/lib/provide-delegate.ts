import { names, nestjsNames } from '@beemood/utils';
import { Inject, Provider } from '@nestjs/common';
import {
  DEFAULT_PRISMA_CLIENT_NAME,
  DEFAULT_PRISMA_CLIENT_PROFILE,
} from './constants.js';
import { getClientToken } from './provide-client.js';

export function getDelegateToken(
  modelName: string,
  name = DEFAULT_PRISMA_CLIENT_NAME,
  profile = DEFAULT_PRISMA_CLIENT_PROFILE,
) {
  return `${names(modelName).contant}_${name}_${profile}_PRISMA_DELEGATE`;
}

export function provideDelegate(
  modelName: string,
  name = DEFAULT_PRISMA_CLIENT_NAME,
  profile = DEFAULT_PRISMA_CLIENT_PROFILE,
): Provider {
  return {
    inject: [getClientToken(name, profile)],
    provide: getDelegateToken(modelName, name, profile),
    useFactory(client: any) {
      return client[names(modelName).camel];
    },
  };
}

export function InjectDelegate(
  modelName?: string,
  name = DEFAULT_PRISMA_CLIENT_NAME,
  profile = DEFAULT_PRISMA_CLIENT_PROFILE,
): ParameterDecorator {
  return (...args) => {
    modelName ??= nestjsNames((args[0] as Function).name).camel;
    modelName = names(modelName).camel;
    Inject(getDelegateToken(modelName, name, profile))(...args);
  };
}
