import { ProjectType } from './schema';

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
    case 'db':
      return 'db';
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
    case 'db':
      return `dbs/${projectName}`;
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
