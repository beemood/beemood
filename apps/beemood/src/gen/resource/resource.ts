import { formatFiles, generateFiles, names, Tree } from '@nx/devkit';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { ResourceGeneratorSchema, ResourceType } from './schema.js';

/**
 * Generate rest resource
 * @param tree nx workspace tree
 * @param options
 */
export async function resourceGenerator(
  tree: Tree,
  options: ResourceGeneratorSchema
) {
  const { name, type, project } = options;
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const source = join(__dirname, type);
  const resourceRoot = (() => {
    switch (type) {
      case ResourceType.CREATE_DTO:
      case ResourceType.UPDATE_DTO:
      case ResourceType.QUERY_DTO:
      case ResourceType.DTO: {
        return `apps/${project}/src/${options.name}/dto`;
      }
      case ResourceType.CONTROLLER:
      case ResourceType.MODULE: {
        return `apps/${project}/src/${options.name}`;
      }
    }
  })();

  const templateOptions = { ...names(name) };
  generateFiles(tree, source, resourceRoot, templateOptions);
  await formatFiles(tree);
}

export default resourceGenerator;
