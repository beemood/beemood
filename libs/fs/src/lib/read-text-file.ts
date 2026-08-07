import { readFile } from 'fs/promises';

export async function readTextFile(
  filePath: string,
  abortController?: AbortController,
) {
  return await readFile(filePath, {
    encoding: 'utf-8',
    signal: abortController?.signal,
  });
}
