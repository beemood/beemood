// @index(['./**/*.ts', '!./**/*.{spec,test}.ts','!./**/{boot,main}.ts'], f => `export * from '${f.path}.js'`)
export * from './lib/app.module.js';
export * from './lib/category/category.controller.js';
export * from './lib/category/category.module.js';
export * from './lib/category/dto/category.dto.js';
export * from './lib/category/dto/query-category.dto.js';
export * from './lib/inventory.module.js';
export * from './lib/price-level/dto/price-level.dto.js';
export * from './lib/price-level/dto/query-price-level.dto.js';
export * from './lib/price-level/price-level.controller.js';
export * from './lib/price-level/price-level.module.js';
export * from './lib/product/dto/product.dto.js';
export * from './lib/product/dto/query-product.dto.js';
export * from './lib/product/product.controller.js';
export * from './lib/product/product.module.js';

