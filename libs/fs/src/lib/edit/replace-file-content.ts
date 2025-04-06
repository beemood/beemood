import type { EachHandler } from '@bmod/types';
import type { ForEachFileValue } from '../iterators/for-each-file.js';
import { forEachFile } from '../iterators/for-each-file.js';
import { lastSegment } from '../path/filename.js';
import { replaceTextFile } from '../text/replace-text-file.js';

export type ReplaceFileContentOptions = {
  filepath: string;
  expressions?: string[];
  from: string[];
  to: string[];
  recursive?: boolean;
};

export async function replaceFileContent(options: ReplaceFileContentOptions) {
  const { filepath, expressions, recursive } = options;

  const isMatching = (name: string) =>
    expressions?.some((e) => {
      return new RegExp(e).test(name);
    }) || true;

  const replaceHandler: EachHandler<ForEachFileValue> = async ({
    path: currentFilepath,
    isFile,
  }) => {
    const currentFilename = lastSegment(currentFilepath);
    if (isFile && isMatching(currentFilename)) {
      const { from, to } = options;
      await replaceTextFile(currentFilepath, from, to);
    }
  };

  await forEachFile(filepath, replaceHandler, { recursive });
}
