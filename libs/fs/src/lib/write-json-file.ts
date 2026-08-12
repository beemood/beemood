import { writeTextFile } from './write-text-file.js';

export async function writeJsonFile<T extends object>(
  filePath: string,
  content: T,
  abortController?: AbortController,
): Promise<void> {
  const jsonContent = JSON.stringify(content, undefined, 2);
  await writeTextFile(filePath, jsonContent, abortController);
}
