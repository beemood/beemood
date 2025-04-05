import type { HelloOptions } from './hello-options.js';

export function hello(options: HelloOptions) {
  console.log(`Hello, ${options.name}`);
}
