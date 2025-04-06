import type { FsOptions } from './fs-options.js';

export function fs(options: FsOptions) {
  console.log(`Fs, ${options.name}`);
}
