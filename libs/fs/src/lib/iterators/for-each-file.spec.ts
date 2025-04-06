import { mkdir, rm, writeFile } from 'fs/promises';
import { join } from 'path';
import { forEachFile, ForEachFileValue } from './for-each-file.js';

describe('forEachFile: go thorugh for each file', () => {
  const root = 'tmp/for-each-file';
  beforeAll(async () => {
    await mkdir(join(root, 'dir1'), { recursive: true });
    await writeFile(join(root, 'dir1/file1.txt'), '');
    await writeFile(join(root, 'dir1/file2.txt'), '');
    await mkdir(join(root, 'dir2'), { recursive: true });
  });

  afterAll(async () => {
    await rm(root, { recursive: true });
  });

  it('should go though the root directory only', async () => {
    const handler = vi.fn();
    await forEachFile(root, handler);
    expect(handler).toHaveBeenCalledTimes(2);
    expect(handler).toHaveBeenCalledWith(
      {
        path: join(root, 'dir1'),
        isDirectory: true,
        isFile: false,
      } as ForEachFileValue,
      0
    );
    expect(handler).toHaveBeenCalledWith(
      {
        path: join(root, 'dir2'),
        isDirectory: true,
        isFile: false,
      } as ForEachFileValue,
      1
    );
    handler.mockRestore();
  });

  it('should go through each directory recursively', async () => {
    const handler = vi.fn();
    await forEachFile(root, handler, { recursive: true });
    expect(handler).toHaveBeenCalledTimes(4);

    expect(handler).toHaveBeenCalledWith(
      {
        path: join(root, 'dir1', 'file1.txt'),
        isDirectory: false,
        isFile: true,
      } as ForEachFileValue,
      0
    );
    expect(handler).toHaveBeenCalledWith(
      {
        path: join(root, 'dir1', 'file2.txt'),
        isDirectory: false,
        isFile: true,
      } as ForEachFileValue,
      1
    );

    handler.mockRestore();
  });
});
