/**
 * RestApi paths
 */
export type Paths = {
  /**
   * `items`
   */
  plural: string;

  /**
   * `item`
   */
  singular: string;

  /**
   * `items/:id`
   */
  id: string;

  /**
   * `items/:id/actions/increment`
   */
  increment: string;

  /**
   * `items/:id/actions/decrement`
   */
  decrement: string;

  /**
   * `items/actions/count`
   */
  count: string;

  /**
   * `items/actions`
   */
  action: string;

  /**
   * `items/:id/actions`
   */
  actionId: string;

  /**
   * `items/:id/relations/:relationName`
   */
  relation: string;

  /**
   * `items/:id/relations/:relationName/:relationId`
   */
  relationId: string;

  /**
   * `items/:id/uploads/file`
   */
  file: string;

  /**
   * `items/:id/uploads/img`
   */
  img: string;

  /**
   * `items/:id/uploads/pdf
   */
  pdf: string;

  /**
   * `items/:id/uploads/txt`
   */
  txt: string;
};
