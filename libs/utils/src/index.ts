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
export * from './lib/extract-annotations.js';
export * from './lib/factory-collector.js';
export * from './lib/is-defined-then.js';
export * from './lib/is-defined.js';
export * from './lib/is-empty-string.js';
export * from './lib/is-in-or-throw.js';
export * from './lib/is-true-then.js';
export * from './lib/is-type.js';
export * from './lib/keys.js';
export * from './lib/lowercase-first.js';
export * from './lib/matcher.js';
export * from './lib/names.js';
export * from './lib/nestjs-names.js';
export * from './lib/set-default.js';
export * from './lib/to-brand-email.js';
export * from './lib/to-camel-case.js';
export * from './lib/to-constant-case.js';
export * from './lib/to-dot-case.js';
export * from './lib/to-instance.js';
export * from './lib/to-kebab-case.js';
export * from './lib/to-normal-case.js';
export * from './lib/to-pascal-case.js';
export * from './lib/to-sentence-case.js';
export * from './lib/to-snake-case.js';
export * from './lib/to-title-case.js';
export * from './lib/trim.js';
export * from './lib/types.js';
export * from './lib/uppercase-first.js';

