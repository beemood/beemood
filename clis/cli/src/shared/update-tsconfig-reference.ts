import { readJsonFile, writeJsonFile } from '@nx/devkit';
import { WORKSPACE_TSCONFIG } from './constants';
/**
 * Update workspace root `tsconfig.json` files references by adding the generated project path such as `{ "path": "./libs/my-project"}`
 * @group generator
 * @param projectRootDirectory root directory
 */
export async function updateTsconfigReference(projectRootDirectory: string) {
  const content = await readJsonFile(WORKSPACE_TSCONFIG);

  if (content.references == undefined) {
    content.references = [];
  }

  content.references.push({
    path: `./${projectRootDirectory}`,
  });

  await writeJsonFile(WORKSPACE_TSCONFIG, content, { spaces: 2 });
}
