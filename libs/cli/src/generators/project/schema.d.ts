export type ProjectType = 'api' | 'lib' | 'cli';

export interface ProjectGeneratorSchema {
  name: string;
  projectType: ProjectType;
}
