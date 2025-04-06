import { writeFile } from 'fs/promises';

export async function writeJsonFile<T extends object>(
  filepath: string,
  jsonObject = {} as T
) {
  const content = JSON.stringify(jsonObject);
  await writeFile(filepath, content, { encoding: 'utf-8' });
}
