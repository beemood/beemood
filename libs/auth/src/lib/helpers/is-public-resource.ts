import { PUBLIC_METADATA_TOKEN } from '@bmod/rest';
import type { ExecutionContext } from '@nestjs/common';
import type { Reflector } from '@nestjs/core';

export function isPublicResource(
  context: ExecutionContext,
  reflector: Reflector
): boolean {
  return reflector.getAllAndOverride(PUBLIC_METADATA_TOKEN, [
    context.getHandler(),
    context.getClass(),
  ]);
}
