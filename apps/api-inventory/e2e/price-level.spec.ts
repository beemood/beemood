import { expect, test } from '@playwright/test';
import { describe } from 'node:test';

describe('price-levels', () => {
  test('GET /', async ({ request }) => {
    const res = await request.get('/api/price-levels');
    expect(res.ok()).toEqual(true);
    expect(res.status()).toEqual(200);
    expect(await res.json()).toBeInstanceOf(Array);
  });
});
