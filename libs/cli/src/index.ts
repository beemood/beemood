// @index(['./**/*.ts', '!./**/*.{spec,test}.ts', '!./**/cli.ts'], f => `export * from '${f.path}.js'`)
export * from './commands/bye.command.js';
export * from './commands/hello.command.js';
export * from './generators/project/project.js';
export * from './generators/project/schema.d.js';
export * from './generators/resource/resource.js';
export * from './generators/resource/schema.d.js';

