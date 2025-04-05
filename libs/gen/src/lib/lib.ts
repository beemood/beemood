import { isDefinedOrThrow } from '@bmod/is';
import type { Tree } from '@nx/devkit';
import { formatFiles, generateFiles, names } from '@nx/devkit';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import type { LibGeneratorSchema } from './schema.js';

const filename = fileURLToPath(import.meta.url);
const __dirname = dirname(filename);

/**
 * Generate library project
 * @param tree nx tree
 * @param options {@link LibGeneratorSchema}
 */
export async function libGenerator(tree: Tree, options: LibGeneratorSchema) {
  const { directory } = options;
  const source = join(__dirname, 'files');
  const name = isDefinedOrThrow(directory.split('/').pop());
  generateFiles(tree, source, directory, { directory, ...names(name) });
  await formatFiles(tree);
}

export default libGenerator;
