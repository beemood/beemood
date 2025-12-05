// @index(['./**/*.ts', '!./**/*.spec.ts'], f => `export * from '${f.path}.js'`)
export * from './lib/interceptors/prisma-exception.filter.js';
export * from './lib/prisma.module.js';
export * from './lib/provide-client.js';
export * from './lib/provide-repository.js';

