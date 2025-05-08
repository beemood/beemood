import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { Tree } from '@nx/devkit';

import { resourceGenerator } from './resource.js';
import { ResourceGeneratorSchema } from './schema.js';

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
