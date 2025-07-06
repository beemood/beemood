import {
  formatFiles,
  generateFiles,
  names,
  Tree,
  workspaceRoot,
} from '@nx/devkit';
import * as path from 'path';
import { ProjectGeneratorSchema } from './schema';
import { updateTsconfigReference } from '../../shared/update-tsconfig-reference';
import { workspacePackageJson } from '../../shared/workspace-package-json';
import {
  createProjectName,
  getProjectRootDirectory,
  getSourceDirectory,
} from './helpers';

/**
 * Generate library, api,
 * @group generator
 * @param tree nx workspace Tree
 * @param options project generator options {@link ProjectGeneratorSchema}
 */
export async function projectGenerator(
  tree: Tree,
  options: ProjectGeneratorSchema
) {
  const { projectName: __projectName, projectType } = options;

  const __names = names(__projectName);
  const projectRoot = getProjectRootDirectory(__projectName, projectType);
  const sourceDirectory = path.join(__dirname, getSourceDirectory(projectType));
  const targetDirectory = path.join(workspaceRoot, projectRoot);
  const mp = await workspacePackageJson();
  const projectName = createProjectName(__names.fileName, mp.name);

  const substitutions = { ...__names, mp, projectRoot, projectName };

  generateFiles(tree, sourceDirectory, targetDirectory, substitutions);
  await formatFiles(tree);
  await updateTsconfigReference(projectRoot);
}

export default projectGenerator;
