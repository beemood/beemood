import { InvalidParamError } from '@beemood/errors';
import { Operation, Operations } from './operation.js';
import { PermissionString } from './permission-string.js';

export function validatePermisionString(
  value: string
): value is PermissionString {
  const [resouce, operation] = value.split(':');

  if (resouce && Operations.includes(operation as Operation)) {
    return true;
  }

  throw new InvalidParamError(`${value} is not a valid permission string`);
}
