import { formatFiles, generateFiles, names, Tree } from '@nx/devkit';
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
