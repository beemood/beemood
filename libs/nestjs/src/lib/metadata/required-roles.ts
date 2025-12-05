import { Role } from '../auth/role.js';
import { createMetadata } from '../helpers/create-metadata.js';

export const {
  getMetadata: getRequriedResourceRoles,
  setClassMetadata: RequriedResourceRoles,
  setMethodMetadata: RequiredMethodRoles,
} = createMetadata<Role[]>('ResourceRoles');
