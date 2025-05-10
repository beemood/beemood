import { expect, test } from '@playwright/test';
import { describe } from 'node:test';

describe('categories', () => {
  test('GET /', async ({ request }) => {
    const res = await request.get('/api/categories');
    expect(res.ok()).toEqual(true);
    expect(res.status()).toEqual(200);
    expect(await res.json()).toBeInstanceOf(Array);
  });
});
