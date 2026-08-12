import { InvalidJsonError } from '@beemood/errors';
import { readTextFile } from './read-text-file.js';

export async function readJsonFile<T extends object>(
  filePath: string,
  abortController?: AbortController,
): Promise<T> {
  const textContent = await readTextFile(filePath, abortController);
  try {
    return JSON.parse(textContent) as T;
  } catch {
    throw new InvalidJsonError();
  }
}
