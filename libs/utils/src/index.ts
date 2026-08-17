//
import createDebug from 'debug';
export const debug = createDebug('@beemood/utils');
//

// @index(['./**/*.ts', '!./**/*.spec.ts'], f => `export * from '${f.path}.js'`)
export * from './global.d.js';
export * from './lib/codify-object.js';
export * from './lib/collector.js';
export * from './lib/defined-or-throw.js';
export * from './lib/errors.js';
export * from './lib/factory-collector.js';
export * from './lib/is-defined-then.js';
export * from './lib/is-defined.js';
export * from './lib/is-empty-string.js';
export * from './lib/is-in-or-throw.js';
export * from './lib/is-true-then.js';
export * from './lib/is-type.js';
export * from './lib/keys.js';
export * from './lib/matcher.js';
export * from './lib/nestjs-names.js';
export * from './lib/set-default.js';
export * from './lib/trim.js';
export * from './lib/types.js';
