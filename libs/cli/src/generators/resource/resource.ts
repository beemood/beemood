import type { Tree } from '@nx/devkit';
import { formatFiles, generateFiles } from '@nx/devkit';
import * as path from 'path';
import type { ResourceGeneratorSchema } from './schema.js';

/**
 * Generate rest api resource module, controller, and data transfer objects
 *
 * @group Generator
 *
 * @example
 *
 * ````bash
 *  npx nx g @beemood/cli:resource <resource-name>
 * ````
 */
export async function resourceGenerator(
  tree: Tree,
  options: ResourceGeneratorSchema
) {
  const projectRoot = `libs/${options.name}`;

  generateFiles(tree, path.join(__dirname, 'files'), projectRoot, options);
  await formatFiles(tree);
}

export default resourceGenerator;
