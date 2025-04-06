import { propertyCase } from '@bmod/is';
import type { EachHandler } from '@bmod/types';
import { rename as __rename } from 'fs/promises';
import { dirname, join } from 'path';
import type { ForEachFileValue } from '../iterators/for-each-file.js';
import { forEachFile } from '../iterators/for-each-file.js';
import { lastSegment } from '../path/filename.js';
export type RenameOptions = {
  filepath: string;
  expressions?: string[];
  recursive?: boolean;
  suffix?: string;
  prefix?: string;
  from?: string[];
  to?: string[];
};

export async function rename(options: RenameOptions) {
  const { filepath, expressions, recursive } = options;
  const sourceTarget: [string, string][] = [];

  const isMatching = (name: string) =>
    expressions?.some((e) => {
      return new RegExp(e).test(name);
    }) || true;

  const renameHandler: EachHandler<ForEachFileValue> = async (value) => {
    const { path: currentFilepath } = value;
    let currentFilename = lastSegment(currentFilepath);

    if (isMatching(currentFilename)) {
      const currentDirname = dirname(currentFilepath);

      propertyCase(options)
        .def('suffix', (suffix) => {
          currentFilename += suffix;
        })
        .def('prefix', (prefix) => {
          currentFilename = prefix + currentFilename;
        })
        .def('from', (__from, { to }) => {
          if (!to)
            throw new Error(
              `to property is required when the from is provided!`
            );

          __from.forEach((from, index) => {
            console.log(`Replacing ${from} with ${to[index] ?? to[0]}`);
            currentFilename = currentFilename.replaceAll(
              from,
              to[index] ?? to[0]
            );
          });
        });

      sourceTarget.push([
        currentFilepath,
        join(currentDirname, currentFilename),
      ]);
    }
  };

  await forEachFile(filepath, renameHandler, { recursive });

  for (const [source, target] of sourceTarget) {
    await __rename(source, target);
  }
}
