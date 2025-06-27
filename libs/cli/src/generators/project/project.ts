import type { Tree } from '@nx/devkit';
import {
  formatFiles,
  generateFiles,
  names,
  readJsonFile,
  workspaceRoot,
} from '@nx/devkit';
import * as path from 'path';
import type { ProjectGeneratorSchema } from './schema.js';

/**
 * NX workspace generator to generate project with advance test, build, package, and documentation configurations.
 *
 * @group Generator
 *
 * @example
 *
 * ````bash
 *  npx nx g @beemood/cli:project` <project-name> <project-type(lib|cli|api)>
 * ````
 */
export async function projectGenerator(
  tree: Tree,
  options: ProjectGeneratorSchema
) {
  const __names = names(options.name);

  const mainPackage = await readJsonFile(
    path.join(workspaceRoot, 'package.json')
  );

  const projectRoot = `${options.projectType}s/${__names.fileName}`;
  const projectNamePrefix = process.env.PROJECT_NAME_PREFIX ?? '';
  const repositoryUsername = process.env.REPOSITORY_USERNAME ?? '';
  const repositoryName = process.env.REPOSITORY_NAME ?? '';
  const projectName = `${projectNamePrefix}${__names.fileName}`;

  const source = path.join(__dirname, 'files', options.projectType);
  generateFiles(tree, source, projectRoot, {
    ...__names,
    projectName,
    projectRoot,
    mp: mainPackage,
    repositoryUsername,
    repositoryName,
  });
  await formatFiles(tree);
}

export default projectGenerator;
