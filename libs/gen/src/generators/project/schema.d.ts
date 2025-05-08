export interface ProjectGeneratorSchema {
  directory: string;
  type: 'library' | 'cli' | 'api' | 'client';
}
