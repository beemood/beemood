import { mkdir, writeFile } from 'fs/promises';
import { dirname } from 'path';
/**
 * Write text file
 * @param filepath
 * @param content string
 * @returns
 */
export async function writeTextFile(filepath: string, content = '') {
  await mkdir(dirname(filepath), { recursive: true });
  return await writeFile(filepath, content, { encoding: 'utf8' });
}
