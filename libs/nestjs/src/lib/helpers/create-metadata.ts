import { Stringable } from '@beemood/types';
import { ExecutionContext, SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { metadataRegistry } from '../registry/metadata-registry.js';

export type MetadataFunctions<T> = {
  setClassMetadata: (value: T) => ClassDecorator;
  setMethodMetadata: (value: T) => MethodDecorator;
  getMetadata: (reflector: Reflector, context: ExecutionContext) => T;
};

/**
 * Creates a set of metadata functions for managing custom metadata in NestJS decorators.
 *
 * This function registers a unique metadata key and returns an object containing methods
 * to set and retrieve metadata at both the class and method level. The metadata key must
 * be unique across the application.
 *
 * @template T - The type of the metadata value being stored and retrieved
 * @param metadataKey {@link string} - A unique key identifier for the metadata. Must not have been
 *                                previously registered with this function
 * @returns - {@link MetadataFunctions<T>} An object containing three methods:
 *   - **setClassMetadata**: Sets metadata on a class decorator
 *   - **setMethodMetadata**: Sets metadata on a method decorator
 *   - **getMetadata**: Retrieves metadata from either class or method level, with method-level
 *                  metadata taking precedence
 * @throws - {@link ExistError} If the provided metadataKey has already been registered
 *
 * @example
 * ````ts
 * const myMetadata = createMetadata<string>('my-custom-key');
 *
 * \@myMetadata.setClassMetadata('class-value')
 * class MyClass {}
 *
 * const value = myMetadata.getMetadata(reflector, context);
 * ````
 *
 */
export function createMetadata<T extends Stringable>(
  metadataKey: string
): MetadataFunctions<T> {
  metadataRegistry.addOrThrow(metadataKey);

  return {
    setClassMetadata(value: T) {
      return (...args) => {
        SetMetadata(metadataKey, value)(...args);
      };
    },
    setMethodMetadata(value: T) {
      return (...args) => {
        SetMetadata(metadataKey, value)(...args);
      };
    },
    getMetadata(reflector: Reflector, context: ExecutionContext): T {
      return reflector.getAllAndOverride<T>(metadataKey, [
        context.getClass(),
        context.getHandler(),
      ]);
    },
  };
}
