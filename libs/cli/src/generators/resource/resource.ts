import type { Tree } from '@nx/devkit';
import {
  formatFiles,
  generateFiles,
  names,
  readProjectConfiguration,
} from '@nx/devkit';
import * as path from 'path';
import { fileURLToPath } from 'url';
import type { ResourceGeneratorSchema } from './schema.js';

const fileName = fileURLToPath(import.meta.url);
const __dirname = path.dirname(fileName);

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
  const targetProjectConfiguration = readProjectConfiguration(
    tree,
    options.project
  );

  const __names = names(options.name);

  const source = path.join(__dirname, 'files');
  const target = path.join(
    targetProjectConfiguration.root,
    'src',
    'app',
    __names.fileName
  );

  generateFiles(tree, source, target, { ...__names });

  await formatFiles(tree);
}

export default resourceGenerator;
