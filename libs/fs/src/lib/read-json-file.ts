import { readTextFile } from './read-text-file.js';

export async function readJsonFile<T>(
  filePath: string,
  abortController?: AbortController,
): Promise<T> {
  return JSON.parse(await readTextFile(filePath, abortController)) as T;
}
