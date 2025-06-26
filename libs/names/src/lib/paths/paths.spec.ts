import { describe, it, expect } from 'vitest';
import { paths } from './paths.js';
import { Paths } from './paths-type.js';

describe('restPaths', () => {
  it('should generate correct paths without prefix', () => {
    const name = 'category';
    const expected: Paths = {
      plural: 'categories',
      singular: 'category',
      id: 'category/:id',
      increment: 'category/:id/increment',
      decrement: 'category/:id/decrement',
      count: 'categories/count',
      relation: 'category/:id/:rn',
      relationId: 'category/:id/:rn/:rid',
      file: 'category/:id/file',
      img: 'category/:id/img',
    };

    const result = paths(name);
    expect(result).toEqual(expected);
  });

  it('should generate correct paths with prefix', () => {
    const name = 'User';
    const prefix = 'api';
    const expected: Paths = {
      plural: 'api/users',
      singular: 'api/user',
      id: 'api/user/:id',
      increment: 'api/user/:id/increment',
      decrement: 'api/user/:id/decrement',
      count: 'api/users/count',
      relation: 'api/user/:id/:rn',
      relationId: 'api/user/:id/:rn/:rid',
      file: 'api/user/:id/file',
      img: 'api/user/:id/img',
    };

    const result = paths(name, prefix);
    expect(result).toEqual(expected);
  });

  it('should handle different resource names', () => {
    const name = 'product';
    const expected: Paths = {
      plural: 'products',
      singular: 'product',
      id: 'product/:id',
      increment: 'product/:id/increment',
      decrement: 'product/:id/decrement',
      count: 'products/count',
      relation: 'product/:id/:rn',
      relationId: 'product/:id/:rn/:rid',
      file: 'product/:id/file',
      img: 'product/:id/img',
    };

    const result = paths(name);
    expect(result).toEqual(expected);
  });

  it('should handle empty prefix', () => {
    const name = 'order';
    const prefix = '';
    const expected: Paths = {
      plural: 'orders',
      singular: 'order',
      id: 'order/:id',
      increment: 'order/:id/increment',
      decrement: 'order/:id/decrement',
      count: 'orders/count',
      relation: 'order/:id/:rn',
      relationId: 'order/:id/:rn/:rid',
      file: 'order/:id/file',
      img: 'order/:id/img',
    };

    const result = paths(name, prefix);
    expect(result).toEqual(expected);
  });
});
