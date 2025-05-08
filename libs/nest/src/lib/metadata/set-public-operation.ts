import { SetMetadata } from '@nestjs/common';
import { MetadataToken } from './metadata-token.js';

/**
 * Mark the operation as public
 * @returns MethodDecorator
 */
export function SetPublicOperation(): MethodDecorator {
  return (...args) => {
    SetMetadata(MetadataToken.PUBLIC_RESOURCE, true)(...args);
  };
}

/**
 * Mark the operation as NOT public. This decorator is for a public resouce that has some none-public operations
 * @returns MethodDecorator
 */
export function SetNotPublicOperation(): MethodDecorator {
  return (...args) => {
    SetMetadata(MetadataToken.PUBLIC_RESOURCE, false)(...args);
  };
}
