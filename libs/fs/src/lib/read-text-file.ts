import { readFile } from 'fs/promises';

/**
 * read text file
 * @param filepath
 * @returns string
 */
export async function readTextFile(filepath: string) {
  return await readFile(filepath, { encoding: 'utf8' });
}
