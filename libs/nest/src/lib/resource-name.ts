import { SetMetadata } from '@nestjs/common';

export const RESOURCE_NAME_TOKEN = 'RESOURCE_NAME_TOKEN';

export function ResourceName(resourceName: string): ClassDecorator {
  return (...args) => {
    SetMetadata(RESOURCE_NAME_TOKEN, resourceName)(...args);
  };
}
