import { workspaceRoot } from '@nx/devkit';
import { join } from 'path';
/**
 * Workspace `tsconfig.json` file path
 * @group generator
 */
export const WORKSPACE_TSCONFIG = join(workspaceRoot, 'tsconfig.json');
