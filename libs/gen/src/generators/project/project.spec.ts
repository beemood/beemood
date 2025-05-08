import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { Tree } from '@nx/devkit';

import { projectGenerator } from './project.js';
import { ProjectGeneratorSchema } from './schema.js';

describe('project generator', () => {
  let tree: Tree;
  const options: ProjectGeneratorSchema = {
    directory: 'test',
    type: 'library',
  };

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
  });

  it('should run successfully', async () => {
    await projectGenerator(tree, options);
  });
});
