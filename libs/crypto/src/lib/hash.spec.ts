import { Hash } from './hash.js';

describe('Hash', () => {
  it('should hash data', async () => {
    const data = 'data'.repeat(50);
    const hashValue = await Hash.hash(data);
    expect(hashValue).not.equal('data');
    expect(await Hash.compare(data, hashValue)).toEqual(true);
  });
});
