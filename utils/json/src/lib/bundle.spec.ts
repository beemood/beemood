import { resolve } from 'path';
import { bundle } from './bundle.js';

describe('bundle', () => {
  it('should work', async () => {
    await bundle(
      resolve(__dirname, '..', '..', 'schemas', 'model.schema.json'),
      resolve(__dirname, '..', '..', 'schemas', 'model.json')
    );
  });
});
