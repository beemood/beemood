import { toBrandEmail } from '@beemood/utils';
import {
  formatFiles,
  generateFiles,
  names,
  Tree,
  updateJson,
} from '@nx/devkit';
import { basename, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import type {
  NormalizeProjectGeneratorSchema,
  ProjectGeneratorSchema,
} from './schema.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function normalizeOptions(
  rawOptions: ProjectGeneratorSchema,
): NormalizeProjectGeneratorSchema {
  const shortName = basename(rawOptions.directory);
  const projectName = `@${rawOptions.username}/${shortName}`;
  const brandName = `${rawOptions.username}-${shortName}`;
  const email = toBrandEmail(rawOptions.email, brandName);

  return { ...rawOptions, projectName, email, shortName, ...names(shortName) };
}

async function updateTsconfigReferences(tree: Tree, directory: string) {
  updateJson(tree, 'tsconfig.json', (value) => {
    if (!value.references) {
      value.references = [];
    }
    value.references.push({ path: `./${directory}` });
    return value;
  });
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

  generateFiles(tree, soruceDir, targetDir, { ...options });

  await updateTsconfigReferences(tree, options.directory);

  await formatFiles(tree);
}

export default projectGenerator;
