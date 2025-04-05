import { Tree } from '@nx/devkit';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { cliGenerator } from './cli.js';
import { CliGeneratorSchema } from './schema.js';

describe('cli generator', () => {
  let tree: Tree;
  const options: CliGeneratorSchema = { directory: 'test' };

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
  });

  it('should run successfully', async () => {
    await cliGenerator(tree, options);
  });
});
