import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { MetadataToken } from './metadata-token.js';

/**
 * Get operation name
 * @param reflector Reflector
 * @param context ExecutionContext
 * @returns operation name
 */
export function getOperationName(
  reflector: Reflector,
  context: ExecutionContext
) {
  return reflector.getAllAndOverride(MetadataToken.OPERATION_NAME, [
    context.getClass(),
    context.getHandler(),
  ]);
}
