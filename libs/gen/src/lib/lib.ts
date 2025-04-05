import {
  addProjectConfiguration,
  extractLayoutDirectory,
  formatFiles,
  generateFiles,
  names,
  Tree,
} from '@nx/devkit';
import * as path from 'path';
import { LibGeneratorSchema } from './schema.js';

export async function libGenerator(tree: Tree, options: LibGeneratorSchema) {
  const { directory } = options;

  generateFiles(tree, path.join(__dirname, 'files'), directory, {
    directory,
    ...names(directory.split('/').pop()!),
  });
  await formatFiles(tree);
}

export default libGenerator;
