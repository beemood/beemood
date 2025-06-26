// @index(['./**/*.ts', '!./**/*.{spec,test}.ts'], f => `export * from '${f.path}.js'`)
export * from './lib/prisma-client.module.js';
export * from './lib/provide-client.js';
export * from './lib/provide-repository.js';

