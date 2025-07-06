export type ProjectType = 'apps' | 'clis' | 'libs' | 'utils';

export interface ProjectGeneratorSchema {
  name: string;
  projectType: ProjectType;
}
