// @index(['./**/*.ts', '!./**/*.spec.ts'], f => `export * from '${f.path}.js'`)
export * from './lib/printers/base-printer.js';
export * from './lib/printers/class-printer.js';
export * from './lib/printers/decorator-printer.js';
export * from './lib/printers/printer.js';
export * from './lib/printers/property-printer.js';
export * from './lib/to-code.js';
