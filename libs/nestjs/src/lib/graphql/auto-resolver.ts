import { Type } from '@nestjs/common';
import { Args, Query, Resolver, ResolverOptions } from '@nestjs/graphql';

export type OperationDtos = {
  oneDto?: () => Type;
  manyDto?: () => Type;
  oneResponseDto?: () => Type;
  manyResponseDto?: () => Type | [Type];
};

export type AutoResolverOptions = {
  type: () => Type;
  create?: OperationDtos;
  update?: OperationDtos;
  find?: OperationDtos;
  delete?: OperationDtos;
} & ResolverOptions;

export function FindMany(
  type: () => [Type],
  operationName?: string,
): MethodDecorator {
  return (...args) => {
    Query(type, { name: operationName, nullable: true })(...args);
  };
}

export function FindOne(
  type: () => Type,
  operationName?: string,
): MethodDecorator {
  return (...args) => {
    Query(type, { name: operationName, nullable: true })(...args);
  };
}

export function FindArgs(
  type: () => Type,
  argumentName?: string,
): ParameterDecorator {
  return (...args) => {
    Args({ type, name: argumentName, nullable: true })(...args);
  };
}

export function AutoResolver(options: AutoResolverOptions): ClassDecorator {
  return (...args) => {
    Resolver(options.type, { isAbstract: options.isAbstract })(...args);
  };
}
