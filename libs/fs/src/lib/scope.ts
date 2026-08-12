import { AccessDeniedError } from '@beemood/errors';
import { resolve } from 'node:path';

/**
 * Create a resolve function that limit the access to the {@link scopePath}.
 *
 * @param scopePath
 * @returns
 */
export function scope(scopePath: string) {
  scopePath = resolve(scopePath);

  const scopedResolver = (...args: string[]) => {
    const resolvedPath = resolve(...args);
    if (!resolvedPath.startsWith(scopePath)) {
      throw new AccessDeniedError(
        `The path, ${resolvedPath} is out of the defiend scope, ${scopePath}`,
      );
    }
  };

  return scopedResolver;
}
