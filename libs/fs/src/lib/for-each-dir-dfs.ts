import { Directory } from './dirs.js';
import { DirectoryCallback } from './for-each-dir-bfs.js';

/**
 * For each directory. Use this function if you do rename operations.
 * @param directories array of {@link Directory} objects
 * @param handler function {@link DirectoryCallback}
 */
export function forEachDirDfs(
  directories: Directory[],
  handler: DirectoryCallback
) {
  for (const d of directories) {
    if (d.children) {
      forEachDirDfs(d.children, handler);
    }
    handler(d);
  }
}
