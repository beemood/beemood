import { type ClassConstructor } from '@beemood/types';
import { extractResourceName, names } from '@beemood/utils';
import { Inject, type Provider } from '@nestjs/common';
import {
  DEFAULT_PRISMA_CLIENT_NAME,
  DEFAULT_PRISMA_CLIENT_PROFILE,
} from '../common/constants.js';
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
    modelName ??= extractResourceName((args[0] as ClassConstructor<any>).name);
    modelName = names(modelName).camel;

    Inject(getDelegateToken(modelName, name, profile))(...args);
  };
}
