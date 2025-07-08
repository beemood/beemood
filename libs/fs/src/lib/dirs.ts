import { readdir, stat } from 'fs/promises';
import { resolve } from 'path';
import { readTextFile } from './read-text-file.js';
import { readJsonFile } from './read-json-file.js';
import { FsErrors } from './fs-errors.js';

/**
 * Directory/file stat
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Directory<T = any> = {
  /**
   * Absolute path
   */
  path: string;

  /**
   * true if the path is directory
   */
  isDirectory: boolean;
  /**
   * true if the path is file
   */
  isFile: boolean;

  /**
   * List of children directories/files
   */
  children?: Directory[];

  /**
   * File content is read if `readContent` or `readJson` set true.
   */
  content?: T;
};

/**
 * {@link dirs} parameter type
 */
export type DirsOptions = {
  /**
   * Recursively read all directories if set true
   */
  recursive?: boolean;

  /**
   * Read text content if true
   */
  readContent?: boolean;
  /**
   * Read json content if true
   */
  readJsonContent?: boolean;
};

/**
 * Read all directories and files under the {@link rootdir} and create directory tree {@link Directory}
 * @param rootdir root directory
 * @param options options {@link DirsOptions}
 * @returns
 */
export async function dirs<T>(
  rootdir: string,
  options?: DirsOptions
): Promise<Directory<T>[]> {
  const { readContent, readJsonContent, recursive } = options || {};

  {
    const rootStat = await stat(rootdir);

    if (rootStat.isFile()) {
      throw new Error(
        `${FsErrors.INVALID_PARAM}: rootdir must be a directory path but found file!`
      );
    }

    if (readContent == true && readJsonContent == true) {
      throw new Error(
        `${FsErrors.INVALID_PARAM}: readContent and readJsonContent are not allowed together!`
      );
    }
  }

  const foundDirs = await readdir(rootdir);

  const directories: Directory[] = foundDirs.map((e) => {
    return {
      path: resolve(rootdir, e),
      isDirectory: false,
      isFile: false,
    };
  });

  for (const d of directories) {
    const s = await stat(d.path);

    if (s.isDirectory()) {
      d.isDirectory = true;
      d.isFile = false;
    } else if (s.isFile()) {
      d.isFile = true;
      d.isDirectory = false;

      if (readContent == true) {
        d.content = await readTextFile(d.path);
      } else if (readJsonContent == true) {
        d.content = await readJsonFile(d.path);
      }
    }

    if (recursive == true) {
      if (s.isDirectory()) {
        d.children = await dirs(d.path, options);
      }
    }
  }

  return directories;
}
