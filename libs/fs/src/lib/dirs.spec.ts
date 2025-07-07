import { join } from 'path';
import { dirs } from './dirs.js';
import { workspaceRoot } from '@nx/devkit';
import { mkdir, rm } from 'fs/promises';
import { writeJsonFile } from './write-json-file.js';
import { inspect } from 'util';

describe('dirs', () => {
  const root = join(workspaceRoot, 'tmp', 'test', 'dirs');
  const testDirs = ['dir1', 'dir2'].map((e) => join(root, e));
  const testFiles = ['dir1/file1.json', 'dir1/file2.json'].map((e) =>
    join(root, e)
  );

  beforeAll(async () => {
    for (const d of testDirs) {
      await mkdir(d, { recursive: true });
    }
    for (const f of testFiles) {
      await writeJsonFile(f, { path: f });
    }
  });

  afterAll(async () => {
    await rm(root, { recursive: true });
  });

  it('should read dirs/files', async () => {
    const directories = await dirs(root);
    expect(directories.length).toEqual(2);
    expect(directories[0].path).toEqual(testDirs[0]);
    expect(directories[1].path).toEqual(testDirs[1]);
    expect(directories[0].isDirectory).toBeTruthy();
    expect(directories[0].isFile).toBeFalsy();
    expect(directories[1].isDirectory).toBeTruthy();
    expect(directories[1].isFile).toBeFalsy();

    expect(directories[0].children).toBeUndefined();
    expect(directories[1].children).toBeUndefined();
    expect(directories[0].content).toBeUndefined();
    expect(directories[1].content).toBeUndefined();
  });

  it('should read dirs/files recursively', async () => {
    const directories = await dirs(root, { recursive: true });

    expect(directories[0].children).toHaveLength(2);
    expect(directories[0]?.children?.[0]?.isFile).toBeTruthy();
    expect(directories[0]?.children?.[1]?.isFile).toBeTruthy();

    expect(directories[0]?.children?.[0]?.path).toEqual(testFiles[0]);
    expect(directories[0]?.children?.[1]?.path).toEqual(testFiles[1]);

    expect(directories[0]?.children?.[0]?.content).toBeUndefined();
    expect(directories[0]?.children?.[1]?.content).toBeUndefined();
  });

  it('should read text content', async () => {
    const directories = await dirs(root, {
      recursive: true,
      readContent: true,
    });

    console.log(inspect(directories, true, 100));

    expect(directories).toHaveLength(2);
    expect(directories[0].children).toHaveLength(2);
    expect(directories[0].children?.[0].content).toEqual(
      JSON.stringify({ path: testFiles[0] })
    );
    expect(directories[0].children?.[1].content).toEqual(
      JSON.stringify({ path: testFiles[1] })
    );
  });
  it('should read json content', async () => {
    const directories = await dirs(root, {
      recursive: true,
      readJsonContent: true,
    });

    console.log(inspect(directories, true, 100));

    expect(directories).toHaveLength(2);
    expect(directories[0].children).toHaveLength(2);
    expect(directories[0].children?.[0].content).toEqual({
      path: testFiles[0],
    });
    expect(directories[0].children?.[1].content).toEqual({
      path: testFiles[1],
    });
  });
});
