import {
  formatFiles,
  generateFiles,
  names,
  Tree,
  workspaceRoot,
} from '@nx/devkit';
import * as path from 'path';
import { ProjectGeneratorSchema, ProjectType } from './schema';
import { updateTsconfigReference } from '../../shared/update-tsconfig-reference';
import { workspacePackageJson } from '../../shared/workspace-package-json';

/**
 * @group generator
 * Get the source directory for the project to be generated.
 * @param projectType string {@link ProjectType}
 * @returns source directory/template directory
 */
export function getSourceDirectory(projectType: ProjectType) {
  switch (projectType) {
    case 'api':
      return 'api';
    case 'cli':
      return 'cli';
    case 'lib':
    case 'util':
      return 'lib';
  }
}

/**
 * Get the project root directory such as `libs/<project-name>`,`apps/<project-name>`,`clis/<project-name>`,`utils/<project-name>`,
 * @group generator
 * @param projectName
 * @param projectType {@link ProjectType}
 * @returns project root directory
 */
export function getProjectRootDirectory(
  projectName: string,
  projectType: ProjectType
) {
  switch (projectType) {
    case 'api':
      return `apps/${projectName}`;
    case 'cli':
      return `clis/${projectName}`;
    case 'lib':
      return `libs/${projectName}`;
    case 'util':
      return `utils/${projectName}`;
  }
}

/**
 * Create the project name with `organization name` prefix
 * @group generator
 * @param projectName project name without prefix
 * @param workspaceProjectName the name defined in the workspace package.json such as `@org/source`
 * @returns actual project name such as `@org/my-project`
 */
export function createProjectName(
  projectName: string,
  workspaceProjectName: string
) {
  return workspaceProjectName.split('/')[0] + '/' + projectName;
}

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
  const { projectName: name, projectType } = options;

  const __names = names(name);
  const projectRoot = getProjectRootDirectory(name, projectType);
  const source = path.join(__dirname, getSourceDirectory(projectType));
  const target = path.join(workspaceRoot, projectRoot);

  const mp = await workspacePackageJson();

  const projectName = createProjectName(__names.fileName, mp.name);

  await generateFiles(tree, source, target, {
    ...__names,
    mp,
    projectRoot,
    projectName,
  });

  await updateTsconfigReference(projectRoot);

  await formatFiles(tree);
}

export default projectGenerator;
