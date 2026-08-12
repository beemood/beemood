import { mkdir as __mkdir } from 'node:fs/promises';
export async function mkdir(directory: string): Promise<void> {
  await __mkdir(directory, { recursive: true });
}
