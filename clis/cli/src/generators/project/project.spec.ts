import { join, resolve } from 'path';
import {
  createProjectName,
  getProjectRootDirectory,
  getSourceDirectory,
} from './helpers.js';

describe('projectGenerator', () => {
  it('should create project name', () => {
    expect(createProjectName('some', '@org/other')).toEqual('@org/some');
  });

  it('should get project root directory', () => {
    expect(getProjectRootDirectory('some', 'lib')).toEqual('libs/some');
    expect(getProjectRootDirectory('some', 'api')).toEqual('apps/some');
    expect(getProjectRootDirectory('some', 'cli')).toEqual('clis/some');
    expect(getProjectRootDirectory('some', 'util')).toEqual('utils/some');
  });

  it('should get source directory', () => {
    expect(getSourceDirectory('api')).toEqual('api');
    expect(getSourceDirectory('cli')).toEqual('cli');
    expect(getSourceDirectory('lib')).toEqual('lib');
    expect(getSourceDirectory('util')).toEqual('lib');
  });
});
