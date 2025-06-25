import { formatFiles, generateFiles, Tree } from '@nx/devkit';
import * as path from 'path';
import { ResourceGeneratorSchema } from './schema';

export async function resourceGenerator(
  tree: Tree,
  options: ResourceGeneratorSchema
) {
  const projectRoot = `libs/${options.name}`;

  generateFiles(tree, path.join(__dirname, 'files'), projectRoot, options);
  await formatFiles(tree);
}

export default resourceGenerator;
