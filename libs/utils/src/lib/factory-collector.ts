import { Any, Some } from '@beemood/types';
import { isDefinedThen } from './is-defined-then.js';

export class FactoryCollector<FactoryFn extends (...args: Any[]) => Any> {
  private readonly _collect: FactoryFn[] = [];

  addIf(
    condition: Some<boolean>,
    thenHandler: () => FactoryFn,
    elseHandler?: () => FactoryFn,
  ) {
    if (condition === true) {
      this._collect.push(thenHandler());
    } else {
      isDefinedThen(elseHandler, (handler) => {
        this._collect.push(handler());
      });
    }
  }

  addIfDefined<T>(
    option: Some<T>,
    thenHandler: (options: T) => FactoryFn,
    elseHandler?: () => FactoryFn,
  ) {
    isDefinedThen(
      option,
      (value) => {
        this._collect.push(thenHandler(value));
      },
      () => {
        isDefinedThen(elseHandler, (handler) => this._collect.push(handler()));
      },
    );
  }

  add(factoryFn: FactoryFn) {
    this._collect.push(factoryFn);
  }

  get collect() {
    return this._collect;
  }
}
