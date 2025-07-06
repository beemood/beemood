import {
  formatFiles,
  generateFiles,
  names,
  Tree,
  workspaceRoot,
} from '@nx/devkit';
import * as path from 'path';
import { ProjectGeneratorSchema } from './schema';
import { updateReference } from '../../shared/update-reference';
import { readWorkspacePackageJson } from '../../shared/read-workspace-package-json';

export async function projectGenerator(
  tree: Tree,
  options: ProjectGeneratorSchema
) {
  const { name, projectType } = options;

  const __names = names(name);
  const directory = path.join(projectType, __names.fileName);
  const source = path.join(__dirname, projectType);
  const target = path.join(workspaceRoot);

  const projectDirectory = '';

  const mp = await readWorkspacePackageJson();
  generateFiles(tree, source, target, { ...__names, directory, mp });
  updateReference(projectDirectory);
  await formatFiles(tree);
}

export default projectGenerator;
