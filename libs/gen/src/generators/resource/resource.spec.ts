import type { Tree } from '@nx/devkit';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { resourceGenerator } from './resource.js';
import type { ResourceGeneratorSchema } from './schema.js';

describe('resource generator', () => {
  let tree: Tree;
  const options: ResourceGeneratorSchema = {
    type: 'rest-resource',
    directory: 'test',
  };

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
  });

  it('should run successfully', async () => {
    await resourceGenerator(tree, options);
  });
});
