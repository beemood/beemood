import { isDefinedOrThrow } from '@bmod/is';
import type { Tree } from '@nx/devkit';
import { formatFiles, generateFiles, names } from '@nx/devkit';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import type { ControllerGeneratorSchema } from './schema.js';

const __dirname = (() => {
  const filename = fileURLToPath(import.meta.url);
  return dirname(filename);
})();

export async function controllerGenerator(
  tree: Tree,
  options: ControllerGeneratorSchema
) {
  const { directory } = options;
  const target = directory;
  const source = join(__dirname, 'files');
  const name = isDefinedOrThrow(directory.split('/').pop());
  generateFiles(tree, source, target, { ...names(name), directory });
  await formatFiles(tree);
}

export default controllerGenerator;
