import { names } from '../names/names.js';
import { pluralize } from '../names/pluralize.js';
import type { Paths } from './paths-type.js';

/**
 * RestApi resource path builder
 * @param resourceName
 * @param prefix
 * @returns
 */
export function paths(resourceName: string, prefix = ''): Paths {
  const pf = prefix ? `${prefix}/` : '';
  const singularName = names(resourceName).kebabCase;
  const pluralName = pluralize(singularName);
  const singularPath = `${pf}${singularName}`;
  const pluralPath = `${pf}${pluralName}`;
  const idPath = `${pluralPath}/:id`;

  return {
    plural: pluralPath,
    singular: singularPath,
    id: `${idPath}`,
    action: `${pluralPath}/actions/:action`,
    actionId: `${pluralPath}/:id/actions/:action`,
    increment: `${idPath}/actions/increment`,
    decrement: `${idPath}/actions/decrement`,
    count: `${pluralPath}/actions/count`,
    relation: `${idPath}/relations/:relationName`,
    relationId: `${idPath}/relations/:relationName/:relationId`,
    file: `${idPath}/uploads/file`,
    img: `${idPath}/uploads/img`,
    pdf: `${idPath}/uploads/pdf`,
    txt: `${idPath}/uploads/txt`,
  };
}
