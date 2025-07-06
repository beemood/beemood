import { readJsonFile, workspaceRoot } from '@nx/devkit';
import { join } from 'path';

/**
 * Get the workspace `package.json` file content as object
 * @group generator
 * @returns package.json object
 */
export async function workspacePackageJson() {
  return await readJsonFile(join(workspaceRoot, 'package.json'));
}
