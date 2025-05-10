import { expect, test } from '@playwright/test';
import { describe } from 'node:test';

describe('products', () => {
  test('GET /', async ({ request }) => {
    const res = await request.get('/api/products');
    expect(res.status()).toEqual(200);
    expect(await res.json()).toBeInstanceOf(Array);
  });
});
