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
  const segments = project.split('/');

  const source = join(__dirname, type);
  const target = segments.slice(0, -1).join('/');
  const projectConfig = readProjectConfiguration(tree, project);

  console.log(projectConfig.root);
  console.log(projectConfig.sourceRoot);

  switch (type) {
    case 'controller': {
      generateFiles(tree, source, projectConfig.sourceRoot!, {
        ...names(name),
      });
      break;
    }
    case 'module': {
      generateFiles(tree, source, projectConfig.sourceRoot!, {
        ...names(name),
      });
      break;
    }
    case 'dto': {
      generateFiles(tree, source, projectConfig.sourceRoot!, {
        ...names(name),
      });
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
