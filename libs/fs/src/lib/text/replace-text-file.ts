import { readTextFile } from './read-text-file.js';
import { writeTextFile } from './write-text-file.js';

export function replaceContent(
  content: string,
  fromValues: string[],
  toValues: string[]
) {
  fromValues.forEach((c, i) => {
    content = content.replaceAll(c, toValues[i] || toValues[0]);
  });
  return content;
}

export async function replaceTextFile(
  filepath: string,
  from: string[],
  to: string[]
) {
  let content = await readTextFile(filepath);
  content = replaceContent(content, from, to);
  await writeTextFile(filepath, content);
}
