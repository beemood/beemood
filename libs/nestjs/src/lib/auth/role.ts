import { Comparable, Stringable } from '@beemood/types';
import { PermissionString } from './permission-string.js';
import { Permission } from './permission.js';

export class Role implements Comparable<Role>, Stringable {
  protected readonly _permissions: Set<string>;
  constructor(public readonly name: string, permissions: Permission[] = []) {
    this._permissions = new Set<string>(permissions.map((e) => e.toString()));
  }

  compare(other: Role): number {
    return this.name.localeCompare(other.name);
  }

  has(permission: Permission) {
    return this._permissions.has(permission.toString());
  }

  permissions() {
    return Array.from(this._permissions).map((value) =>
      Permission.fromString(value as PermissionString)
    );
  }

  toString(): string {
    return this.name;
  }
}
