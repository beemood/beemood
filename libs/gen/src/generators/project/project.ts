import type { Tree } from '@nx/devkit';
import { formatFiles, generateFiles, names } from '@nx/devkit';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import type { ProjectGeneratorSchema } from './schema.js';

export async function projectGenerator(
  tree: Tree,
  options: ProjectGeneratorSchema
) {
  const filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(filename);
  const { type, name } = options;
  const source = join(__dirname, type);
  const target = type === 'api' || type === 'client' ? 'apps' : 'libs';

  const directory =
    type === 'api' || type === 'client'
      ? `apps/${type}-${name}`
      : `libs/${name}`;

  generateFiles(tree, source, target, { ...names(name), directory });
  await formatFiles(tree);
}

export default projectGenerator;
