import { SetMetadata } from '@nestjs/common';

export const PUBLIC_METADATA_TOKEN = 'PUBLIC_METADATA_TOKEN';

export function PublicMethod(): MethodDecorator {
  return (...args) => {
    SetMetadata(PUBLIC_METADATA_TOKEN, true)(...args);
  };
}

export function PublicResource(): ClassDecorator {
  return (...args) => {
    SetMetadata(PUBLIC_METADATA_TOKEN, true)(...args);
  };
}
