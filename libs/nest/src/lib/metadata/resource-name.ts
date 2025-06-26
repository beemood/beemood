import { SetMetadata } from '@nestjs/common';

export const RESOURCE_NAME_METADATA_TOKEN = 'RESOURCE_NAME_METADATA_TOKEN';

/**
 * Set the associated resource name metadata to the end point.
 * @param resourceName resource name such as `product`, `category`, `user` etc.
 * @returns
 */
export function ResourceName(resourceName: string): MethodDecorator {
  return (...args) => {
    SetMetadata(RESOURCE_NAME_METADATA_TOKEN, resourceName)(...args);
  };
}
