import { SetMetadata } from '@nestjs/common';
import { PUBLIC_RESOURCE_TOKEN } from './public-resource.js';

export function PublicMethod(): MethodDecorator {
  return (...args) => {
    SetMetadata(PUBLIC_RESOURCE_TOKEN, true)(...args);
  };
}
