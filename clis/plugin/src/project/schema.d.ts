import { names } from '@nx/devkit';

export type ProjectType = 'lib' | 'cli' | 'api' | 'workspace' | 'prisma';

export type ProjectGeneratorSchema = {
  type: ProjectType;
  directory: string;
  fundingUrl: string;
  email: string;
  repoName: string;
  username: string;
  version: string;
  homePage: string;
  fullName: string;
  projectName?: string;
  shortName?: string;
};

export type NormalizeProjectGeneratorSchema = Required<ProjectGeneratorSchema> &
  Required<ReturnType<typeof names>>;
