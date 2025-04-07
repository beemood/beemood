import { Tree } from '@nx/devkit';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { pluginGenerator } from './plugin.js';
import { PluginGeneratorSchema } from './schema.js';

describe('plugin generator', () => {
  let tree: Tree;
  const options: PluginGeneratorSchema = { directory: 'test' };

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
  });

  it('should run successfully', async () => {
    await pluginGenerator(tree, options);
  });
});
