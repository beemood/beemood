import { Any } from '@beemood/types';
import { Inject, InjectionToken, Provider, Scope } from '@nestjs/common';

export type ProviderFunctions<T> = {
  token: () => InjectionToken;
  inject: () => ParameterDecorator;
  provideValue: (useValue: T) => Provider;
  provideFactory: (
    useFactory: (...args: Any[]) => T,
    inject: InjectionToken[]
  ) => Provider;
};

/**
 * Creates a provider factory object with methods for dependency injection in NestJS.
 *
 * @template T - The type of value provided by this provider
 * @param tokenName {@link string}  - Optional name to identify tokens for debugging purposes
 * @returns - {@link ProviderFunctions<T>} An object containing utility functions for:
 *   - `token()` - Returns the unique injection token
 *   - `inject()` - Returns a parameter decorator for injecting this provider
 *   - `provideValue(useValue)` - Creates a provider that uses a static value
 *   - `provideFactory(useFactory, inject, scope)` - Creates a provider with a factory function
 *
 * @example
 * // Create a provider for a service
 * const myProvider = createProvider<MyService>('MyService');
 *
 * // Use in a controller
 * @Controller()
 * export class MyController {
 *   constructor(\@myProvider.inject() myService: MyService) {}
 * }
 *
 * // Provide the value
 * \@Module({
 *   providers: [myProvider.provideValue(new MyService())]
 * })
 */
export function createProvider<T>(tokenName = 'Unknown'): ProviderFunctions<T> {
  const injectionToken = Symbol(tokenName);

  const token = () => {
    return injectionToken;
  };

  const inject = (): ParameterDecorator => {
    return (...args) => {
      Inject(token())(...args);
    };
  };

  const provideValue = (useValue: T): Provider => {
    return {
      provide: token(),
      useValue,
    };
  };

  const provideFactory = (
    useFactory: (...args: Any[]) => T,
    inject?: InjectionToken[],
    scope?: Scope
  ): Provider => {
    return {
      inject,
      provide: token(),
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
