import { SetMetadata } from '@nestjs/common';

export const PUBLIC_RESOURCE_TOKEN = 'PUBLIC_RESOURCE_TOKEN';

export function PublicResource(): ClassDecorator {
  return (...args) => {
    SetMetadata(PUBLIC_RESOURCE_TOKEN, true)(...args);
  };
}



