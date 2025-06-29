import { Controller as __Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PublicResource } from '../metadata/public.js';

export type ControllerOptions = {
  path?: string;
  public?: boolean;
  tags?: string[];
};

/**
 * Resource controller with builtin secured and public metadata options.
 * @param options
 * @returns
 */
export function Controller(options: ControllerOptions): ClassDecorator {
  return (...args) => {
    __Controller(options.path ?? '')(...args);
    if (options.public === true) {
      PublicResource()(...args);
    }
    if (options.tags) {
      ApiTags()(...args);
    }
  };
}
