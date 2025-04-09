import { SetMetadata } from '@nestjs/common';

export const PUBLIC_METADATA_TOKEN = Symbol('PUBLIC_METADATA_TOKEN');

export enum OperationName {
  READ_ONE = 'READ_ONE',
  READ = 'READ',
  READ_OWN = 'READ_OWN',

  WRITE = 'WRITE',
  WRITE_ONE = 'WRITE_ONE',
  WRITE_OWN = 'WRITE_OWN',

  UPDATE = 'UPDATE',
  UPDATE_ONE = 'UPDATE_ONE',
  UPDATE_OWN = 'UPDATE_OWN',

  DELETE = 'DELETE',
  DELETE_ONE = 'DELETE_ONE',
  DELETE_OWN = 'DELETE_OWN',

  APPROVE = 'APPROVE',
  PUBLISH = 'PUBLISH',
  ARCHIVE = 'ARCHIVE',

  LOCK = 'LOCK',
  UNLOCK = 'UNLOCK',
}

export function Public(): MethodDecorator {
  return (...args) => {
    SetMetadata(PUBLIC_METADATA_TOKEN, true)(...args);
  };
}

export const RESOURCE_NAME_METADATA_TOKEN = Symbol(
  'RESOURCE_NAME_METADATA_TOKEN'
);

export function Resource(resourceName: string): ClassDecorator {
  return (...args) => {
    SetMetadata(RESOURCE_NAME_METADATA_TOKEN, resourceName)(...args);
  };
}

export const OPERATION_METADATA_TOKEN = Symbol('OPERATION_METADATA_TOKEN');

export function Operation(name: OperationName): MethodDecorator {
  return (...args) => {
    SetMetadata(OPERATION_METADATA_TOKEN, name)(...args);
  };
}
