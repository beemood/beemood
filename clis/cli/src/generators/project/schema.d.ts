/**
 * Project types
 * @group generator
 */
export type ProjectType = 'api' | 'cli' | 'lib' | 'util' | 'db';

/**
 * Project generator parameter type
 * @group generator
 */
export interface ProjectGeneratorSchema {
  /**
   * Project name
   */
  projectName: string;

  /**
   * project type {@link ProjectType}
   */
  projectType: ProjectType;
}
