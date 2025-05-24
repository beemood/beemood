import {
  formatFiles,
  generateFiles,
  names,
  Tree,
  updateTsConfigsToJs,
} from '@nx/devkit';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { ProjectGeneratorSchema, ProjectType } from './schema.js';

/**
 * Generate project
 * @param tree nx workspace tree
 * @param options {@link ProjectGeneratorSchema}
 */
export async function projectGenerator(
  tree: Tree,
  options: ProjectGeneratorSchema
) {
  const { name, type } = options;
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const source = join(__dirname, type);

  const projectRoot = (() => {
    switch (type) {
      case ProjectType.API:
        return `apps/${name}`;
      case ProjectType.CLI:
      case ProjectType.LIB:
        return `libs/${name}`;
    }
  })();

  const templateOptions = { ...names(name), projectRoot };
  generateFiles(tree, source, projectRoot, templateOptions);
  updateTsConfigsToJs(tree, { projectRoot });
  await formatFiles(tree);
}

export default projectGenerator;
