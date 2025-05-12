/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Type } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { SetResourceName } from '../metadata/set-resource-name.js';

export type ResourceControllerOptions = {
  dtos: () => Type[];
};
/**
 * Api resource class decorator
 * @param pluralName kebab-case plural name e.g products, categories.
 * @returns ClassDecorator
 */
export function ResourceController(
  pluralName: string,
  dtos: Type[]
): ClassDecorator {
  return (...args) => {
    Controller(pluralName)(...args);
    ApiBearerAuth()(...args);
    SetResourceName(pluralName)(...args);
  };
}
