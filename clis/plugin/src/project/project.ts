import { formatFiles, generateFiles, names, Tree } from '@nx/devkit';
import { basename, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import type {
  NormalizeProjectGeneratorSchema,
  ProjectGeneratorSchema,
} from './schema.js';

const __dirname = fileURLToPath(import.meta.url);

function normalizeOptions(
  rawOptions: ProjectGeneratorSchema,
): NormalizeProjectGeneratorSchema {
  const shortName = basename(rawOptions.directory);
  const projectName = `@${rawOptions.username}/${shortName}`;
  const email = rawOptions.email
    .split('@')
    .join(`+${rawOptions.username}-${shortName}`);

  return { ...rawOptions, projectName, email, shortName, ...names(shortName) };
}

async function generateCommon(
  tree: Tree,
  options: NormalizeProjectGeneratorSchema,
) {
  const soruceDir = join(__dirname, 'common');
  const targetDir = options.directory;

  generateFiles(tree, soruceDir, targetDir, { ...options });
}
export async function projectGenerator(
  tree: Tree,
  rawOptions: ProjectGeneratorSchema,
) {
  const options = normalizeOptions(rawOptions);

  generateCommon(tree, options);

  const soruceDir = join(__dirname, options.type);
  const targetDir = options.directory;
  generateFiles(tree, soruceDir, targetDir, options);

  await formatFiles(tree);
}

export default projectGenerator;
