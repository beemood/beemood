export type ProjectType = 'api' | 'lib' | 'cli';

/**
 * Project generator options
 *
 * @group Generator
 *
 */
export interface ProjectGeneratorSchema {
  /**
   * Project name
   */
  name: string;

  /**
   * Project type
   */
  projectType: ProjectType;
}
