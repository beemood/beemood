import { formatFiles, generateFiles, names, Tree } from '@nx/devkit';
import { ResourceGeneratorSchema } from './schema.js';
import { join } from 'path';

export async function resourceGenerator(
  tree: Tree,
  options: ResourceGeneratorSchema
) {
  const { type, directory } = options;
  const segments = directory.split('/');
  const name = segments[segments.length - 1];
  const source = join(__dirname, type);
  generateFiles(tree, source, directory, { ...names(name), directory });
  await formatFiles(tree);
}

export default resourceGenerator;
