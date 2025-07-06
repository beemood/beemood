import { readJsonFile, workspaceRoot } from '@nx/devkit';
import { join } from 'path';

export async function readWorkspacePackageJson() {
  return await readJsonFile(join(workspaceRoot, 'package.json'));
}
