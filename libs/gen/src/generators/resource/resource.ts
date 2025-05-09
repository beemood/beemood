import type { Tree } from '@nx/devkit';
import {
  formatFiles,
  generateFiles,
  names,
  readProjectConfiguration,
} from '@nx/devkit';
import { join } from 'path';
import type { ResourceGeneratorSchema } from './schema.js';

export async function resourceGenerator(
  tree: Tree,
  options: ResourceGeneratorSchema
) {
  const { name, type, project } = options;
  const source = join(__dirname, type);
  const projectConfig = readProjectConfiguration(tree, project);

  const target = projectConfig.sourceRoot + '/lib';

  switch (type) {
    case 'controller': {
      generateFiles(tree, source, target, { ...names(name) });
      break;
    }
    case 'module': {
      generateFiles(tree, source, target, { ...names(name) });
      break;
    }
    case 'dto': {
      generateFiles(tree, source, target, { ...names(name) });
      break;
    }
    case 'rest': {
      await resourceGenerator(tree, { ...options, type: 'controller' });
      await resourceGenerator(tree, { ...options, type: 'module' });
      await resourceGenerator(tree, { ...options, type: 'dto' });
      break;
    }
  }

  // generateFiles(tree, source, projectConfig.sourceRoot, { ...names(name) });
  await formatFiles(tree);
}

export default resourceGenerator;
