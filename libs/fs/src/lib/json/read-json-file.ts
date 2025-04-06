import { readTextFile } from '../text/read-text-file.js';

export async function readJsonFile(filepath: string) {
  const content = await readTextFile(filepath);
  return JSON.parse(content);
}
