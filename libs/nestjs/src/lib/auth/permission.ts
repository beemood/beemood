import { Comparable, Stringable } from '@beemood/types';
import { OperationName } from './operation.js';
import { PermissionString } from './permission-string.js';
import { validatePermisionString } from './validate-permission-string.js';

export class Permission implements Stringable, Comparable<Permission> {
  constructor(
    public readonly resourceName: string,
    public readonly operationName: OperationName
  ) {}

  compare(other: Permission): number {
    return this.toString().localeCompare(other.toString());
  }

  toString() {
    return `${this.resourceName}:${this.operationName}`;
  }

  static fromString(stringValue: PermissionString) {
    validatePermisionString(stringValue);
    const [resouceName, operationName] = stringValue.split(':');
    return new Permission(resouceName, operationName as OperationName);
  }
}
