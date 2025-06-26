import { SetMetadata } from '@nestjs/common';

export const OPERATION_NAME_METADATA_TOKEN = 'OPERATION_NAME_METADATA_TOKEN';

export function OperationName(operationName: string): MethodDecorator {
  return (...args) => {
    SetMetadata(OPERATION_NAME_METADATA_TOKEN, operationName)(...args);
  };
}
