import type { Tree } from '@nx/devkit';
import { formatFiles, generateFiles, names } from '@nx/devkit';
import { join } from 'path';
import type { ResourceGeneratorSchema } from './schema.js';

export async function resourceGenerator(
  tree: Tree,
  options: ResourceGeneratorSchema
) {
  const { type, directory } = options;
  const segments = directory.split('/');
  const name = segments[segments.length - 1];
  const source = join(__dirname, type);
  const target = segments.slice(0, -1).join('/');

  generateFiles(tree, source, target, { ...names(name), directory });
  await formatFiles(tree);
}

export default resourceGenerator;
