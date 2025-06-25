import type { Tree } from '@nx/devkit';
import { formatFiles, generateFiles } from '@nx/devkit';
import * as path from 'path';
import type { ResourceGeneratorSchema } from './schema.js';

export async function resourceGenerator(
  tree: Tree,
  options: ResourceGeneratorSchema
) {
  const projectRoot = `libs/${options.name}`;

  generateFiles(tree, path.join(__dirname, 'files'), projectRoot, options);
  await formatFiles(tree);
}

export default resourceGenerator;
