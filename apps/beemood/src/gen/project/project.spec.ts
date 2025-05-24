import { Tree, readProjectConfiguration } from '@nx/devkit';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { projectGenerator } from './project.js';
import { ProjectGeneratorSchema, ProjectType } from './schema.js';

describe('project generator', () => {
  let tree: Tree;
  const options: ProjectGeneratorSchema = {
    name: 'test',
    type: ProjectType.API,
  };

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
  });

  it('should run successfully', async () => {
    await projectGenerator(tree, options);
    const config = readProjectConfiguration(tree, 'test');
    expect(config).toBeDefined();
  });
});
