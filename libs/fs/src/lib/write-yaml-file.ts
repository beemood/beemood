import { dump } from 'js-yaml';
import { writeTextFile } from './write-text-file.js';

export async function writeYamlFile<T extends object>(
  filePath: string,
  content: T,
  abortController?: AbortController,
): Promise<void> {
  const yamlContent = dump(content);
  await writeTextFile(filePath, yamlContent, abortController);
}
