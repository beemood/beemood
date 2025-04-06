import { writeFile } from 'fs/promises';

export async function writeTextFile(filepath: string, content = '') {
  await writeFile(filepath, content, { encoding: 'utf-8' });
}
