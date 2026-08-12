import { readJsonFile } from './read-json-file.js';
import { writeJsonFile } from './write-json-file.js';

export async function updateJsonFile<T extends object>(
  filePath: string,
  updateFunction: (value: T) => T,
  abortController?: AbortController,
) {
  const originalContent = await readJsonFile<T>(filePath, abortController);
  const updatedContent = await updateFunction(originalContent);
  await writeJsonFile(filePath, updatedContent);
}
