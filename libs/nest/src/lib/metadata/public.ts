import { SetMetadata } from '@nestjs/common';

export const PUBLIC_METADATA_TOKEN = 'PUBLIC_METADATA_TOKEN';

/**
 * Mark the rest end point as public using {@link PUBLIC_METADATA_TOKEN} key
 * @returns {@link MethodDecorator}
 */
export function PublicMethod(): MethodDecorator {
  return (...args) => {
    SetMetadata(PUBLIC_METADATA_TOKEN, true)(...args);
  };
}

/**
 * Mark all rest api end pints of the resource controller as public using {@link PUBLIC_METADATA_TOKEN} key
 * @returns {@link MethodDecorator}
 */
export function PublicResource(): ClassDecorator {
  return (...args) => {
    SetMetadata(PUBLIC_METADATA_TOKEN, true)(...args);
  };
}
