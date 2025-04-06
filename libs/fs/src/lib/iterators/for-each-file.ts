import type { EachHandler } from '@bmod/types';
import { readdir, stat } from 'fs/promises';
import { join } from 'path';

export type FileOrDirectory = 'file' | 'directory';

export type ForEachFileValue = {
  path: string;
  isDirectory: boolean;
  isFile: boolean;
};

export type ForEachFileOptions = {
  recursive?: boolean;
};

export async function forEachFile(
  filepath: string,
  handler: EachHandler<ForEachFileValue>,
  options?: ForEachFileOptions
) {
  const rootDirs = await readdir(filepath);

  await Promise.all(
    rootDirs.map(async (filename, index) => {
      const currentPath = join(filepath, filename);
      const currentStat = await stat(currentPath);

      if (currentStat.isDirectory()) {
        if (options?.recursive === true) {
          await forEachFile(currentPath, handler, options);
        }
      }
      await handler(
        {
          path: currentPath,
          isDirectory: currentStat.isDirectory(),
          isFile: currentStat.isFile(),
        },
        index
      );
    })
  );
}
