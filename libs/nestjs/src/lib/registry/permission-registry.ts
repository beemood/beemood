import { Registry } from '@beemood/registry';
import { Permission } from '../auth/permission.js';

export const permissionRegistry = new Registry<Permission>();
