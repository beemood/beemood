import { readYamlFile } from './read-yaml-file.js';
import { writeYamlFile } from './write-yaml-file.js';

export async function updateYamlnFile<T extends object>(
  filePath: string,
  updateFunction: (value: T) => T,
  abortController?: AbortController,
) {
  const originalContent = await readYamlFile<T>(filePath, abortController);
  const updatedContent = await updateFunction(originalContent);
  await writeYamlFile(filePath, updatedContent, abortController);
}
