import { SetMetadata } from '@nestjs/common';
import { MetadataToken } from './metadata-token.js';
import { OperationName } from './operation-name.js';

/**
 * Set operation name metdata
 * @param name operation name {@link OperationName}
 * @returns MethodDecorator
 */
export function SetOperationName(name: OperationName): MethodDecorator {
  return (...args) => {
    SetMetadata(MetadataToken.OPERATION_NAME, name)(...args);
  };
}

/**
 * Set operation name as {@link OperationName.WRITE}
 * @returns MethodDecorator
 */
export function WriteOperation(): MethodDecorator {
  return (...args) => {
    SetOperationName(OperationName.WRITE)(...args);
  };
}

/**
 * Set operation name as {@link OperationName.READ}
 * @returns MethodDecorator
 */
export function ReadOperation(): MethodDecorator {
  return (...args) => {
    SetOperationName(OperationName.READ)(...args);
  };
}

/**
 * Set operation name as {@link OperationName.UPDATE}
 * @returns MethodDecorator
 */
export function UpdateOperation(): MethodDecorator {
  return (...args) => {
    SetOperationName(OperationName.UPDATE)(...args);
  };
}

/**
 * Set operation name as {@link OperationName.DELETE}
 * @returns MethodDecorator
 */
export function DeleteOperation(): MethodDecorator {
  return (...args) => {
    SetOperationName(OperationName.DELETE)(...args);
  };
}

/**
 * Set operation name as {@link OperationName.MANAGE}
 * @returns MethodDecorator
 */
export function ManageOperation(): MethodDecorator {
  return (...args) => {
    SetOperationName(OperationName.MANAGE)(...args);
  };
}
