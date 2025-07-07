import { Directory } from './dirs.js';

/**
 * Directory callback function
 */
export type DirectoryCallback = (value: Directory) => void;

/**
 * For each directory starting from the top directory
 * @param directories array of {@link Directory} objects
 * @param handler function {@link DirectoryCallback}
 */
export function forEachDirBfs(
  directories: Directory[],
  handler: DirectoryCallback
) {
  for (const d of directories) {
    handler(d);
    if (d.children) {
      forEachDirBfs(d.children, handler);
    }
  }
}
