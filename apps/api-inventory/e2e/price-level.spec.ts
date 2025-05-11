import { expect, test } from '@playwright/test';
import { describe } from 'node:test';

describe('/api/price-levels', () => {
  const timestamp = new Date().getTime().toString();
  const fake = (suffix = '') => ({
    name: `some ${timestamp}${suffix}`,
    taxrate: 10.23,
  });

  function route(...args: string[]) {
    return ['/api/price-levels', ...args].join('/');
  }

  test('POST /', async ({ request }) => {
    const res = await request.post(route(), { data: fake() });
    const body = await res.json();
    expect(res.ok()).toEqual(true);
    expect(res.status()).toEqual(201);
    expect(body).toHaveProperty('id');
  });

  test('PUT /:id', async ({ request }) => {
    const res = await request.put(route('1'), { data: fake('updated') });
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
    const res = await request.get(route('1'));
    const body = await res.json();
    expect(res.ok()).toEqual(true);
    expect(res.status()).toEqual(200);
    expect(body).toHaveProperty('id');
  });

  test('DELETE /:id', async ({ request }) => {
    const res = await request.delete(route('1'));
    const body = await res.json();
    expect(res.ok()).toEqual(true);
    expect(res.status()).toEqual(200);
    expect(body).toHaveProperty('id');
  });
});
