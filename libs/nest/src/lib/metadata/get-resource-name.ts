import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { MetadataToken } from './metadata-token.js';

/**
 * Get resource name
 * @param reflector Reflector
 * @param context ExecutionContext
 * @returns resource name
 */
export function getResourceName(
  reflector: Reflector,
  context: ExecutionContext
) {
  return reflector.getAllAndOverride(MetadataToken.RESOURCE_NAME, [
    context.getClass(),
    context.getHandler(),
  ]);
}
