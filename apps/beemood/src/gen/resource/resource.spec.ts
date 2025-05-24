import { Tree, readProjectConfiguration } from '@nx/devkit';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { resourceGenerator } from './resource.js';
import { ResourceGeneratorSchema, ResourceType } from './schema.js';

describe('resource generator', () => {
  let tree: Tree;
  const options: ResourceGeneratorSchema = {
    name: 'test',
    type: ResourceType.CONTROLLER,
    project: 'some',
  };

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
  });

  it('should run successfully', async () => {
    await resourceGenerator(tree, options);
    const config = readProjectConfiguration(tree, 'test');
    expect(config).toBeDefined();
  });
});
