export type ProjectType = 'lib' | 'cli' | 'api' | 'workspace' | 'prisma';

export interface ProjectGeneratorSchema {
  type: ProjectType;
  directory: string;
}
