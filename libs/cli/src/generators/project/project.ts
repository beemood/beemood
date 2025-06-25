import { formatFiles, generateFiles, names, Tree } from '@nx/devkit';
import { libraryGenerator } from '@nx/js';
import { applicationGenerator } from '@nx/node';
import * as path from 'path';
import { ProjectGeneratorSchema } from './schema';

export async function projectGenerator(
  tree: Tree,
  options: ProjectGeneratorSchema
) {
  const __names = names(options.name);

  const projectRoot = `${options.projectType}s/${__names.fileName}`;

  const projectNamePrefix = process.env.PROJECT_NAME_PREFIX ?? '';
  const projectName = `${projectNamePrefix}${__names.fileName}`;

  switch (options.projectType) {
    case 'api': {
      await applicationGenerator(tree, { directory: projectRoot });
      break;
    }
    case 'lib':
    case 'cli': {
      await libraryGenerator(tree, {
        bundler: 'esbuild',
        publishable: true,
        importPath: projectName,
        unitTestRunner: 'jest',
        directory: projectRoot,
      });
      break;
    }
  }

  generateFiles(
    tree,
    path.join(__dirname, 'files', options.projectType),
    projectRoot,
    {
      ...__names,
      projectName,
      projectRoot,
    }
  );
  await formatFiles(tree);
}

export default projectGenerator;
