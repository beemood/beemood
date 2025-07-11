import { SetMetadata } from '@nestjs/common';

export const OPERATION_NAME_TOKEN = 'OPERATION_NAME_TOKEN';

export function OperationName(operationName: string): ClassDecorator {
  return (...args) => {
    SetMetadata(OPERATION_NAME_TOKEN, operationName)(...args);
  };
}
