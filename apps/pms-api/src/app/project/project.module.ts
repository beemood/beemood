/* eslint-disable @nx/enforce-module-boundaries */
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/pms';
import { ProjectController } from './project.controller.js';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: PrismaClient,
      inject: [ConfigService],
      useFactory(config: ConfigService) {
        const datasourceUrl = config.getOrThrow('DATABASE_URL');
        return new PrismaClient({ datasourceUrl });
      },
    },
  ],
  controllers: [ProjectController],
})
export class ProjectModule {}
