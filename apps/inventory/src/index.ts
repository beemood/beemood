// @index(['./app/**/*.ts', '!./**/*.{spec,test}.ts'], f => `export * from '${f.path}'`)
export * from './app/app.controller';
export * from './app/app.module';
export * from './app/app.service';
export * from './app/resources/category/category.controller';
export * from './app/resources/category/category.module';
export * from './app/resources/category/schemas/category';
export * from './app/resources/category/schemas/create-category';
export * from './app/resources/category/schemas/order-category';
export * from './app/resources/category/schemas/query-many-categories';
export * from './app/resources/category/schemas/select-category-fields';
export * from './app/resources/category/schemas/update-category';
export * from './app/resources/category/schemas/where-category';
export * from './app/resources/resource.module';

