import { SetMetadata } from '@nestjs/common';
import { MetadataToken } from './metadata-token.js';

export function SetPublicResource(): MethodDecorator {
  return (...args) => {
    SetMetadata(MetadataToken.PUBLIC_RESOURCE, true)(...args);
  };
}
