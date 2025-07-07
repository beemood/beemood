import { writeFile } from 'fs/promises';
/**
 * Write text file
 * @param filepath
 * @param content string
 * @returns
 */
export async function writeTextFile(filepath: string, content: string) {
  return await writeFile(filepath, content, { encoding: 'utf8' });
}
