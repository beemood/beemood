import { SetMetadata } from '@nestjs/common';

export const RESOURCE_NAME_METADATA_TOKEN = 'RESOURCE_NAME_METADATA_TOKEN';

export function ResourceName(resourceName: string): MethodDecorator {
  return (...args) => {
    SetMetadata(RESOURCE_NAME_METADATA_TOKEN, resourceName)(...args);
  };
}
