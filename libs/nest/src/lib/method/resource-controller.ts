import { Controller } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

/**
 * Api resource class decorator
 * @param pluralPath plural api resource path
 * @returns ClassDecorator
 */
export function ResourceController(pluralPath: string): ClassDecorator {
  return (...args) => {
    Controller(pluralPath)(...args);
    ApiBearerAuth()(...args);
  };
}
