import { SetMetadata } from '@nestjs/common';
import { MetadataToken } from './metadata-token.js';

export function SetResourceName(name: string): ClassDecorator {
  return (...args) => {
    SetMetadata(MetadataToken.RESOURCE_NAME, name)(...args);
  };
}
