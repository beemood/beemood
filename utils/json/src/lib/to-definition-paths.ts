import { basename } from 'path';
import { JsonSchema } from './json-schema.js';
import {
  DEFINITIONS_PATH_PREFIX,
  isDefinitionPath,
} from './is-definition-path.js';

/**
 * Update all entries of relative `$ref` paths into defintion paths such as `#/definitions/SomeSchemaFileName`
 * @param schema - {@link JsonSchema}
 */
export function toDefinitionPaths(schema: JsonSchema) {
  const entries = Object.entries(schema);
  for (const [key, value] of entries) {
    if (key === '$ref') {
      if (isDefinitionPath(value)) {
        continue;
      }

      const definitionName = basename(value).split('.').slice(0, -1).join('');
      schema.$ref = `${DEFINITIONS_PATH_PREFIX}${definitionName}`;
    } else if (Array.isArray(value)) {
      for (const s of value) {
        toDefinitionPaths(s);
      }
    } else if (typeof value === 'object') {
      toDefinitionPaths(value);
    }
  }
}
