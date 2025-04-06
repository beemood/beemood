import { mkdir, rm } from 'fs/promises';
import { join } from 'path';
import { readTextFile } from '../text/read-text-file.js';
import { writeTextFile } from '../text/write-text-file.js';
import { replaceFileContent } from './replace-file-content.js';

describe('replace-file-content', () => {
  const root = 'tmp/replace-file-content';
  beforeAll(async () => {
    await mkdir(join(root, 'dir1'), { recursive: true });
    await mkdir(join(root, 'dir2'), { recursive: true });
    await writeTextFile(join(root, 'dir1/file1.txt'), 'file1.txt');
    await writeTextFile(join(root, 'dir1/file2.txt'), 'file2.txt');
  });

  afterAll(async () => {
    await rm(root, { recursive: true });
  });

  it('should replace-file-content the file content', async () => {
    await replaceFileContent({
      filepath: join(root),
      from: ['file'],
      to: ['__file__'],
      recursive: true,
    });

    expect(await readTextFile(join(root, 'dir1/file1.txt'))).toEqual(
      '__file__1.txt'
    );
    expect(await readTextFile(join(root, 'dir1/file2.txt'))).toEqual(
      '__file__2.txt'
    );
  });
});
