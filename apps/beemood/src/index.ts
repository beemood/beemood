// @index(['./**/*.ts', '!./**/*.{spec,test,d}.ts', '!./**/__*.ts',  ], f => `export * from '${f.path}.js'`)
export * from './commands/hello/hello.js';
export * from './gen/project/project.js';
export * from './gen/resource/resource.js';

