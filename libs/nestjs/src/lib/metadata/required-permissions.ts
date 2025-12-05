import { Permission } from '../auth/permission.js';
import { createMetadata } from '../helpers/create-metadata.js';

export const {
  getMetadata: getRequiredPermissions,
  setClassMetadata: RequiredResourcePermissions,
  setMethodMetadata: RequiredMethodPermissions,
} = createMetadata<Permission[]>('ResourcePermissions');
