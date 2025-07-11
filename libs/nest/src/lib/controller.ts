import { Controller as __Controller } from '@nestjs/common';
import { PublicResource } from './public-resource.js';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ResourceName } from './resource-name.js';

export type ControllerOptions = {
  path: string;
  resourceName: string;
  public?: boolean;
};

export function Controller(options: ControllerOptions): ClassDecorator {
  return (...args) => {
    __Controller()(...args);

    ResourceName(options.resourceName)(...args);

    if (options.public === true) {
      PublicResource()(...args);
    } else {
      ApiBearerAuth()(...args);
    }
  };
}
