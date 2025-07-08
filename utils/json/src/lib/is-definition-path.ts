export const DEFINITIONS_PATH_PREFIX = '#/definitions/';

export function isDefinitionPath(path: string) {
  return path.startsWith(DEFINITIONS_PATH_PREFIX);
}
