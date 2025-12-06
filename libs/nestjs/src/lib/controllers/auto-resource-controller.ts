import { names, pluralize } from '@beemood/names';
import { Type } from '@nestjs/common';
import { extractResourceName } from '../helpers/extract-resource-name.js';
import { ResourceController } from './resource-controller.js';
import { ResourceMethod } from './resource-methods.js';

export type AutoResourceControllerOptions = {
  pluralPath?: string;
  readDto: Type;
  createDto: Type;
  updateDto: Type;
};

export function AutoResourceController(
  options: AutoResourceControllerOptions
): ClassDecorator {
  const { createDto, readDto, updateDto } = options;

  return (...args) => {
    const targetClass = args[0];

    const pluralPath =
      options.pluralPath ||
      pluralize(names(extractResourceName(args[0].name)).kebab);

    ResourceController(pluralPath)(...args);

    const ownMethodNames = Object.getOwnPropertyNames(
      targetClass.prototype
    ).filter((e) => e != 'constructor');

    for (const methodName of ownMethodNames) {
      const descriptor = Object.getOwnPropertyDescriptor(
        targetClass.prototype,
        methodName
      );

      ResourceMethod({ readDto, createDto, updateDto })(
        targetClass.prototype,
        methodName,
        descriptor!
      );
    }
  };
}
