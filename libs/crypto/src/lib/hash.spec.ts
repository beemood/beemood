import { Hash } from './hash.js';

describe('Hash', () => {
  it('should hash data', async () => {
    const data = 'data'.repeat(50);
    const { hash, salt } = await Hash.hash(data);
    expect(hash).not.toEqual('data');
    expect(await Hash.compare(data, hash, '')).toEqual(false);
    expect(await Hash.compare(data, hash, salt)).toEqual(true);
  });
});
