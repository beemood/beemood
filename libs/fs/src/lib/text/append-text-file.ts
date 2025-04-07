import { appendFile } from 'fs/promises';

export async function appendTextFile(filepath: string, content = '') {
  await appendFile(filepath, content, { encoding: 'utf-8' });
}
