export enum ResourceType {
  /**
   * Generate create dto only
   */
  CREATE_DTO = 'create-dto',

  /**
   * Generate update dto only
   */
  UPDATE_DTO = 'update-dto',
  /**
   * Generate query dto only
   */
  QUERY_DTO = 'query-dto',

  /**
   * Generate all create, update, query dtos
   */
  DTO = 'dto',

  /**
   * Generate rest controller
   */
  CONTROLLER = 'controller',

  /**
   * Generate rest module
   */
  MODULE = 'module',
}

export interface ResourceGeneratorSchema {
  /**
   * Resource name
   */
  name: string;

  /**
   * Resource part type
   */
  type: ResourceType;

  /**
   * Project name
   */
  project: string;
}
