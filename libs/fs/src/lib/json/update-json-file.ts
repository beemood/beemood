import type { ValueHandler } from '@bmod/types';
import { readJsonFile } from './read-json-file.js';
import { writeJsonFile } from './write-json-file.js';

export async function updateJsonFile<T extends object>(
  filepath: string,
  handler: ValueHandler<T, void | Promise<void>>
) {
  const jsonObject = await readJsonFile(filepath);
  await handler(jsonObject);
  await writeJsonFile(filepath, jsonObject);
}
