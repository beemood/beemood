import { writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';
import { mkdir } from './mkdir.js';

export async function writeTextFile(
  filePath: string,
  content: string,
  abortController?: AbortController,
): Promise<void> {
  await mkdir(dirname(filePath));
  await writeFile(filePath, content, {
    encoding: 'utf-8',
    signal: abortController?.signal,
  });
}
