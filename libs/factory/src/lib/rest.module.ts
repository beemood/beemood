import { PrismaModule } from '@bmod/prisma';
import type { DynamicModule } from '@nestjs/common';
import { Module } from '@nestjs/common';
import {
  RestController,
  type RestControllerOptions,
} from './rest.controller.js';

@Module({})
export class RestModule {
  static configure(options: RestControllerOptions): DynamicModule {
    return {
      module: RestModule,
      imports: [PrismaModule.forFeature({ resources: [options.name] })],
      controllers: [RestController(options)],
    };
  }
}
