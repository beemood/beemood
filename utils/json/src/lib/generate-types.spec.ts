import { resolve } from 'path';
import { generateTypes } from './generate-types.js';

describe('generateTypes', () => {
  const schemePath = resolve(__dirname, '..', '..', 'schemas', 'model.json');
  const outputPath = resolve(__dirname, '..', '..', 'schemas', 'model.ts');

  it('should generate types', async () => {
    await generateTypes(schemePath, outputPath);
  });
});
