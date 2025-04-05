import { Tree } from '@nx/devkit';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { libGenerator } from './lib.js';
import { LibGeneratorSchema } from './schema.js';

describe('lib generator', () => {
  let tree: Tree;
  const options: LibGeneratorSchema = { directory: 'test' };

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
  });

  it('should run successfully', async () => {
    await libGenerator(tree, options);
  });
});
