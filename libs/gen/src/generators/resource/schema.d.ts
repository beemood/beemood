export interface ResourceGeneratorSchema {
  name: string;
  project: string;
  type: 'rest' | 'controller' | 'module' | 'dto' | 'e2e';
}
