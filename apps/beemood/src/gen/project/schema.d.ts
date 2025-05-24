export enum ProjectType {
  /**
   * Generate api project
   */
  API = 'api',

  /**
   * Generate cli project
   */
  CLI = 'cli',

  /**
   * Generate library project
   */
  LIB = 'lib',
}

export interface ProjectGeneratorSchema {
  /**
   * Project name
   */
  name: string;

  /**
   * Project type
   */
  type: ProjectType;
}
