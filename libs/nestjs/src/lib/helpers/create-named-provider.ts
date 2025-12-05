import { Any } from '@beemood/types';
import { Inject, InjectionToken, Provider, Scope } from '@nestjs/common';

export type NamedProviderFunctions<T> = {
  token: (name: string) => InjectionToken;
  inject: (name: string) => ParameterDecorator;
  provideValue: (name: string, useValue: T) => Provider;
  provideFactory: (
    name: string,
    useFactory: (...args: Any[]) => T,
    inject: InjectionToken[]
  ) => Provider;
};

export function createNamedProvider<T>(
  tokenPrefix = 'Prefix'
): NamedProviderFunctions<T> {
  const token = (name: string) => {
    return `${tokenPrefix}_${name}`;
  };

  const inject = (name: string): ParameterDecorator => {
    return (...args) => {
      Inject(token(name))(...args);
    };
  };

  const provideValue = (name: string, useValue: T): Provider => {
    return {
      provide: token(name),
      useValue,
    };
  };

  const provideFactory = (
    name: string,
    useFactory: (...args: Any[]) => T,
    inject?: InjectionToken[],
    scope?: Scope
  ): Provider => {
    return {
      inject,
      provide: token(name),
      useFactory,
      scope,
    };
  };

  return {
    token,
    inject,
    provideValue,
    provideFactory,
  };
}
