import { formatFiles, generateFiles, names, Tree } from '@nx/devkit';
import { ProjectGeneratorSchema } from './schema.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const filename = fileURLToPath(import.meta.url);
const __dirname = dirname(filename);

export async function projectGenerator(
  tree: Tree,
  options: ProjectGeneratorSchema
) {
  const { type, directory } = options;
  const segments = directory.split('/');
  const name = segments[segments.length - 1];
  const source = join(__dirname, type);
  generateFiles(tree, source, directory, { ...names(name), directory });
  await formatFiles(tree);
}

export default projectGenerator;
