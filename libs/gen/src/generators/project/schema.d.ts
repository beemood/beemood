export interface ProjectGeneratorSchema {
  name: string;
  type: 'library' | 'cli' | 'api' | 'client';
}
