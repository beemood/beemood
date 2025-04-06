import { readFile } from 'fs/promises';

export async function readTextFile(filepath: string) {
  return await readFile(filepath, { encoding: 'utf-8' });
}
