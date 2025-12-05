import { ExistError } from '@beemood/errors';
import { Registry as IRegistry, Stringable } from '@beemood/types';

export type RegistryValue<T extends Stringable> = {
  value: () => T;
  createdAt: Date;
  lifetime?: number;
};

export class Registry<T extends Stringable> implements IRegistry<T> {
  private readonly map = new Map<string, RegistryValue<T>>();

  constructor(protected readonly lifetime?: number) {}

  add(value: T, lifetime = this.lifetime): boolean {
    if (this.has(value)) {
      return false;
    }

    this.map.set(value.toString(), {
      createdAt: new Date(),
      value: () => value,
      lifetime,
    });

    return true;
  }

  addOrThrow(value: T) {
    if (this.has(value)) {
      throw new ExistError(`${value.toString()} is already registered `);
    }
    return this.add(value);
  }

  remove(value: T): boolean {
    return this.map.delete(value.toString());
  }

  removeOrThrow(value: T): boolean {
    if (!this.has(value)) {
      throw new ExistError(`${value.toString()} is not registered`);
    }
    return this.remove(value);
  }

  protected isValid(value: RegistryValue<T>) {
    if (value.lifetime && value.lifetime > 0) {
      if (new Date().getTime() - value.createdAt.getTime() > value.lifetime) {
        this.map.delete(value.value.toString());
        return false;
      }
    }

    return true;
  }

  has(value: T): boolean {
    const found = this.map.get(value.toString());
    return found != undefined && this.isValid(found);
  }

  values(): T[] {
    return [...this.map.values()]
      .filter((e) => this.isValid(e))
      .map((e) => e.value());
  }

  clear(): void {
    this.map.clear();
  }

  size(): number {
    return this.values().length;
  }
}
