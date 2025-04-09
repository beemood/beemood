// @index(['./**/*.ts', '!./**/*.{spec,test}.ts'], f => `export * from '${f.path}.js'`)
export * from './lib/prisma.module.js';
export * from './lib/provide-prisma-client.js';
export * from './lib/provide-prisma-delegate.js';

