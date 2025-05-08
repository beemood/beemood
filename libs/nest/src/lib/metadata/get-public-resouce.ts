import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { MetadataToken } from './metadata-token.js';

/**
 * Get public resouce metadata
 * @param reflector Reflector
 * @param context ExecutionContext
 * @returns boolean
 */
export function getPublicResource(
  reflector: Reflector,
  context: ExecutionContext
) {
  return reflector.getAllAndOverride(MetadataToken.PUBLIC_RESOURCE, [
    context.getClass(),
    context.getHandler(),
  ]);
}
