/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Type } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SetResourceName } from '../metadata/set-resource-name.js';

export type ResourceControllerOptions = {
  dtos: () => Type[];
};
/**
 * Api resource class decorator
 * @param name kebab-case plural name e.g products, categories.
 * @returns ClassDecorator
 */
export function ResourceController(name: string, dtos: Type[]): ClassDecorator {
  return (...args) => {
    ApiTags(name[0].toUpperCase() + name.slice(1) + 'Controller')(...args);
    Controller(name)(...args);
    ApiBearerAuth()(...args);
    SetResourceName(name)(...args);
  };
}
