import { SetMetadata } from '@nestjs/common';

export const OPERATION_NAME_METADATA_TOKEN = 'OPERATION_NAME_METADATA_TOKEN';

/**
 * Set operation name metadata using {@link OPERATION_NAME_METADATA_TOKEN} key
 * @param operationName resource operation name such as `findAllProducts`, `findOneProductById`, `deleteProductById` etc.
 * @returns {@link MethodDecorator}
 */
export function OperationName(operationName: string): MethodDecorator {
  return (...args) => {
    SetMetadata(OPERATION_NAME_METADATA_TOKEN, operationName)(...args);
  };
}
