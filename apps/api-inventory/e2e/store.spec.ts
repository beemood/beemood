import { expect, test } from '@playwright/test';
import { describe } from 'node:test';

describe('StoreModule', () => {
  test('GET /', async ({ request }) => {
    const res = await request.get('/api/stores');
    expect(res.ok()).toEqual(true);
    expect(res.status()).toEqual(200);
    expect(await res.json()).toBeInstanceOf(Array);
  });
});
