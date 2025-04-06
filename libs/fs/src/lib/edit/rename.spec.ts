import { mkdir, rm, stat } from 'fs/promises';
import { join } from 'path';
import { writeTextFile } from '../text/write-text-file.js';
import { rename } from './rename.js';

describe('rename: rename files and directories', () => {
  const root = 'tmp/rename';

  beforeEach(async () => {
    await mkdir(join(root, 'dir1'), { recursive: true });
    await mkdir(join(root, 'dir2'), { recursive: true });
    await writeTextFile(join(root, 'dir1', 'file1.txt'));
    await writeTextFile(join(root, 'dir1', 'file2.txt'));
  });

  afterEach(async () => {
    await rm(root, { recursive: true });
  });

  it('should rename only root directories', async () => {
    await rename({
      filepath: root,
      expressions: ['^dir'],
      from: ['dir', '1', '2'],
      to: ['dr', '100', '200'],
      suffix: '__',
      prefix: '--',
    });

    {
      const s = await stat(join(root, '--dr100__'));
      expect(s.isDirectory()).toBeTruthy();
    }
    {
      const s = await stat(join(root, '--dr200__'));
      expect(s.isDirectory()).toBeTruthy();
    }
  });

  it('should rename files and directories recursively', async () => {
    await rename({
      filepath: root,
      expressions: [],
      from: ['dir', '1', '2', 'file'],
      to: ['dr', '100', '200', 'fl'],
      suffix: '__',
      prefix: '--',
      recursive: true,
    });

    {
      const s = await stat(join(root, '--dr100__'));
      expect(s.isDirectory()).toBeTruthy();
    }
    {
      const s = await stat(join(root, '--dr200__'));
      expect(s.isDirectory()).toBeTruthy();
    }
    {
      const s = await stat(join(root, '--dr100__', '--fl100.txt__'));
      expect(s.isFile()).toBeTruthy();
    }
    {
      const s = await stat(join(root, '--dr100__', '--fl200.txt__'));
      expect(s.isFile()).toBeTruthy();
    }
  });
});
