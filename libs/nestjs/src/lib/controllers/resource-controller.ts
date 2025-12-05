import { Controller } from '@nestjs/common';
import { extractResourceName } from '../helpers/extract-resource-name.js';
import { ResourceName } from '../metadata/resource-name.js';

export function ResourceController(pluralPath: string): ClassDecorator {
  return (...args) => {
    Controller(pluralPath)(...args);
    const className = args[0].name;
    const resouceName = extractResourceName(className);
    ResourceName(resouceName)(...args);
  };
}
