import { Controller } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { SetResourceName } from '../metadata/set-resource-name.js';

/**
 * Api resource class decorator
 * @param pluralName kebab-case plural name e.g products, categories.
 * @returns ClassDecorator
 */
export function ResourceController(pluralName: string): ClassDecorator {
  return (...args) => {
    Controller(pluralName)(...args);
    ApiBearerAuth()(...args);
    SetResourceName(pluralName)(...args);
  };
}
