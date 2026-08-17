import {
  type StrictClassDecorator,
  type StrictMethodDecorator,
  type StrictParameterDecorator,
} from '@beemood/types';
import { ParseIntPipe, ParseUUIDPipe, type Type } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';

/**
 * GraphQl find-many method decorator
 * @param type
 * @returns
 */
export function FindMany(type: () => [Type]): StrictMethodDecorator {
  return (...args) => {
    Query(type)(...args);
  };
}

/**
 * GraphQL find-one method decorator
 * @param type
 * @returns
 */
export function FindOne(type: () => Type): StrictMethodDecorator {
  return (...args) => {
    Query(type, { nullable: true })(...args);
  };
}

/**
 * GraphQL find-paramters decorator
 * @param type
 * @returns
 */
export function FindArgs(type: () => Type): StrictParameterDecorator {
  return (...args) => {
    Args({ type, nullable: true })(...args);
  };
}

/**
 * GraphQL "id" paramter decorator
 *
 * @returns
 */
export function ArgsId(): StrictParameterDecorator {
  return (...args) => {
    Args({ name: 'id' }, ParseIntPipe)(...args);
  };
}

/**
 * GraphQL "uuid" paramter decorator
 *
 * @returns
 */
export function ArgsUuid(): StrictParameterDecorator {
  return (...args) => {
    Args({ name: 'uuid' }, ParseUUIDPipe)(...args);
  };
}

export function AutoResolver(type: () => Type): StrictClassDecorator {
  return (...args) => {
    Resolver(type)(...args);
  };
}
