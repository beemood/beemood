// @index(['./**/*.ts', '!./**/*.{spec,test}.ts', '!./**/program.ts'], f => `export * from '${f.path}.js'`)
export * from './commands/hello/hello.command.js';
export * from './generators/project/helpers.js';
export * from './generators/project/project.js';
export * from './generators/project/schema.d.js';
export * from './shared/constants.js';
export * from './shared/update-tsconfig-reference.js';
export * from './shared/workspace-package-json.js';
