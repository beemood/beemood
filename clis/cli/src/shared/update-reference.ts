import { readJsonFile, writeJsonFile } from '@nx/devkit';
import { WORKSPACE_TSCONFIG } from './constants';

export async function updateReference(projectRootDirectory: string) {
  const content = await readJsonFile(WORKSPACE_TSCONFIG);

  if (content.references == undefined) {
    content.references = [];
  }

  content.readJsonFile.push({
    path: `./${projectRootDirectory}`,
  });

  await writeJsonFile(WORKSPACE_TSCONFIG, content, { spaces: 2 });
}
