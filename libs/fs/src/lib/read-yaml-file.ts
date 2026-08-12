import { load } from 'js-yaml';
import { readTextFile } from './read-text-file.js';

export async function readYamlFile<T extends object>(
  filePath: string,
  abortController?: AbortController,
): Promise<T> {
  const content = await load(await readTextFile(filePath, abortController));
  return content as T;
}
