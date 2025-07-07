import { writeTextFile } from './write-text-file.js';

/**
 * Write json file
 * @param filepath
 * @param content
 */
export async function writeJsonFile<T>(filepath: string, content: T) {
  await writeTextFile(filepath, JSON.stringify(content));
}
