import type { APIRequestContext } from '@playwright/test';
import { expect, test } from '@playwright/test';
import { describe } from 'node:test';

describe('/api/quantity', () => {
  async function findAll(request: APIRequestContext) {
    const res = await request.get('/api/quantity');
    const body = await res.json();
    return body;
  }

  test('GET /', async ({ request }) => {
    const res = await request.get('/api/quantity');
    const body = await res.json();
    expect(res.ok()).toEqual(true);
    expect(res.status()).toEqual(200);
    expect(body).toBeInstanceOf(Array);
  });

  test('GET /:id', async ({ request }) => {
    const all = await findAll(request);
    const res = await request.get(`/api/quantity/${all[0].id}`);
    const body = await res.json();
    expect(res.ok()).toEqual(true);
    expect(res.status()).toEqual(200);
    expect(body).toHaveProperty('id');
  });
});
