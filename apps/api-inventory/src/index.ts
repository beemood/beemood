// @index(['./**/*.ts', '!./**/*.{spec,test}.ts','!./**/{boot,main}.ts'], f => `export * from '${f.path}.js'`)
export * from './lib/app.module.js';
export * from './lib/inventory.module.js';
export * from './lib/product/dto/create-product.dto.js';
export * from './lib/product/dto/product.dto.js';
export * from './lib/product/dto/query-product.dto.js';
export * from './lib/product/dto/update-product.dto.js';
export * from './lib/product/product.controller.js';
export * from './lib/product/product.module.js';
export * from './lib/product/product.service.js';

