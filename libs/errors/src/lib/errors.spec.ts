import { readFile } from 'fs/promises';
import { load } from 'js-yaml';
import { join } from 'path';
import { cwd } from 'process';

describe('Errors', () => {
  it('should generate all errors', async () => {
    const rawMeta = await readFile(join(cwd(), 'meta.yaml'), {
      encoding: 'utf-8',
    });

    const generatedFile = await readFile(join(__dirname, 'errors.ts'), {
      encoding: 'utf-8',
    });

    const meta = load(rawMeta) as Record<string, string>;

    expect(meta).toBeTypeOf('object');

    for (const key of Object.keys(meta)) {
      expect(generatedFile).include(key);
    }
  });
});
