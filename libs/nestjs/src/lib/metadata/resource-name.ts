import { createMetadata } from '../helpers/create-metadata.js';

export const { setClassMetadata: ResourceName, getMetadata: getResourceName } =
  createMetadata<string>('ResourceName');
