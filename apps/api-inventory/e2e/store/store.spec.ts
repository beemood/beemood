import type { APIRequestContext } from '@playwright/test';
import { expect, test } from '@playwright/test';
import { describe } from 'node:test';

describe('/api/store', () => {
  async function findAll(request: APIRequestContext) {
    const res = await request.get('/api/store');
    const body = await res.json();
    return body;
  }

  test('GET /', async ({ request }) => {
    const res = await request.get('/api/store');
    const body = await res.json();
    expect(res.ok()).toEqual(true);
    expect(res.status()).toEqual(200);
    expect(body).toBeInstanceOf(Array);
  });

  test('GET /:id', async ({ request }) => {
    const all = await findAll(request);
    const res = await request.get(`/api/store/${all[0].id}`);
    const body = await res.json();
    expect(res.ok()).toEqual(true);
    expect(res.status()).toEqual(200);
    expect(body).toHaveProperty('id');
  });
});
