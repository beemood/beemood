import { expect, test } from '@playwright/test';
import { describe } from 'node:test';

describe('products', () => {
  const timestamp = new Date().getTime().toString();
  const fake = (suffix = '') => ({
    name: `product ${timestamp}${suffix}`,
    barcode: ``,
  });

  function route(...args: string[]) {
    return ['/api/stores', ...args].join('/');
  }

  describe('Create', () => {
    test('raw', async ({ request }) => {
      const res = await request.post(route());
      const body = await res.json();
      expect(body).toBeDefined();
    });
  });

  test('GET /', async ({ request }) => {
    const res = await request.get('/api/products');
    expect(res.status()).toEqual(200);
    expect(await res.json()).toBeInstanceOf(Array);
  });
});
