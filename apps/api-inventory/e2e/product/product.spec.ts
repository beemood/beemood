import { expect, test } from '@playwright/test';
import { describe } from 'node:test';

const timestamp = new Date().getTime().toString();

const fake = (suffix = '') => ({
  name: `some ${timestamp}${suffix}`,
});

function route(...args: string[]) {
  return ['/api/product', ...args].join('/');
}

describe('/api/product', () => {
  let items: any[];

  test.beforeAll(async ({ request }) => {
    const res = await request.get('/api/product');
    items = await res.json();
    expect(items).toBeDefined();
    expect(items.length).toBeGreaterThan(2);
  });

  test('POST /', async ({ request }) => {
    const res = await request.post(route(), { data: fake() });
    const body = await res.json();
    expect(res.ok()).toEqual(true);
    expect(res.status()).toEqual(201);
    expect(body).toHaveProperty('id');
  });

  test('PUT /:id', async ({ request }) => {
    const res = await request.put(route(items[0].id), {
      data: fake('updated'),
    });
    const body = await res.json();
    expect(body).toHaveProperty('id');
  });

  test('GET /', async ({ request }) => {
    const res = await request.get(route());
    const body = await res.json();
    expect(res.ok()).toEqual(true);
    expect(res.status()).toEqual(200);
    expect(body).toBeInstanceOf(Array);
  });

  test('GET /:id', async ({ request }) => {
    const res = await request.get(route(items[0].id));
    const body = await res.json();
    expect(res.ok()).toEqual(true);
    expect(res.status()).toEqual(200);
    expect(body).toHaveProperty('id');
  });

  test('DELETE /:id', async ({ request }) => {
    const res = await request.delete(route(items[2].id));
    const body = await res.json();
    expect(res.ok()).toEqual(true);
    expect(res.status()).toEqual(200);
    expect(body).toHaveProperty('id');
  });
});
