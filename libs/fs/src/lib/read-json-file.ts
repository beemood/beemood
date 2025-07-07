import { readTextFile } from './read-text-file.js';

/**
 * read json file
 * @param filepath
 * @returns T
 */
export async function readJsonFile<T>(filepath: string): Promise<T> {
  const content = await readTextFile(filepath);
  return JSON.parse(content);
}
