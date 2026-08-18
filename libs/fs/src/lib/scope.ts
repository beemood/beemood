import { AccessDeniedError } from '@beemood/errors';
import { resolve } from 'node:path';

/**
 * Create a path resolver function that prevent users from accessing files/directories out of the {@link scopePath}.
 *
 * @param scopePath
 * @returns
 */
export function scope(scopePath: string): typeof resolve {
  scopePath = resolve(scopePath);

  const scopedResolver = (...args: string[]): string | never => {
    const resolvedPath = resolve(...args);
    if (!resolvedPath.startsWith(scopePath)) {
      throw new AccessDeniedError(
        `The path, ${resolvedPath} is out of the defiend scope, ${scopePath}`,
      );
    }
    return resolvedPath;
  };

  return scopedResolver;
}
