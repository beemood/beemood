/* eslint-disable @typescript-eslint/no-explicit-any */
import { readJsonFile, writeJsonFile } from '@bmod/fs';
import { isDefinedOrThrow } from '@bmod/is';
import type { Tree } from '@nx/devkit';
import {
  formatFiles,
  generateFiles,
  names,
  readProjectConfiguration,
} from '@nx/devkit';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import type { GeneratorGeneratorSchema } from './schema.js';

type Names = {
  name: string;
  className: string;
  propertyName: string;
  constantName: string;
  fileName: string;
};
const __dirname = (() => {
  const filename = fileURLToPath(import.meta.url);
  return dirname(filename);
})();

type NormalizedOptions = {
  name: string;
  allNames: Names;
  target: string;
  source: string;
  directory: string;
  projectRoot: string;
  projectSourceRoot: string;
  generatorJsonFilePath: string;
};

function normalizeOptions(
  tree: Tree,
  options: GeneratorGeneratorSchema
): NormalizedOptions {
  const { directory, project } = options;
  const projectConfig = readProjectConfiguration(tree, project);

  const { root: projectRoot, sourceRoot: projectSourceRoot } = projectConfig;

  if (!projectSourceRoot) throw new Error(`${project} does not exist!`);
  const target = join(projectSourceRoot, directory);

  const source = join(__dirname, 'files');

  const name = isDefinedOrThrow(directory.split('/').pop());

  const generatorJsonFilePath = join(projectRoot, 'generators.json');
  return {
    name,
    directory,
    allNames: names(name),
    source,
    target,
    projectSourceRoot,
    projectRoot,
    generatorJsonFilePath,
  };
}

async function updateGeneratorJson(tree: Tree, options: NormalizedOptions) {
  const { name, generatorJsonFilePath } = options;
  const generatorObject = await readJsonFile(generatorJsonFilePath);

  generatorObject.generators[name] = {
    factory: `./dist/${name}/${name}.js`,
    schema: `./dist/${name}/schema.json`,
    description: `${name} generator`,
  };

  await writeJsonFile(generatorJsonFilePath, generatorObject);
}

async function checkGeneratorJsonFile(
  tree: Tree,
  options: NormalizedOptions
): Promise<void> {
  try {
    const content = await readJsonFile(options.generatorJsonFilePath);
    if (!content.generators) {
      throw new Error('ENOENT');
    }
  } catch (err: any) {
    if (err.code === 'ENOENT' || err.message === 'ENOENT') {
      await writeJsonFile(options.generatorJsonFilePath, {
        generators: {},
      });
    }
  }
}

export async function generatorGenerator(
  tree: Tree,
  options: GeneratorGeneratorSchema
) {
  const normalOptions = normalizeOptions(tree, options);

  console.table(normalOptions);

  const { source, target, allNames, directory } = normalOptions;
  await checkGeneratorJsonFile(tree, normalOptions);
  await updateGeneratorJson(tree, normalOptions);
  generateFiles(tree, source, target, { ...allNames, directory });
  await formatFiles(tree);
}

export default generatorGenerator;
