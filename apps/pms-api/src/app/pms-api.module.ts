import { HttpAuthGuard } from '@bmod/auth';
import { PrismaModule } from '@bmod/prisma';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { Prisma, PrismaClient } from '@prisma/pms-api';
import { ProjectModule } from './project/project.module.js';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaModule.configure({
      client: PrismaClient,
      models: Prisma.ModelName,
    }),
    ProjectModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: HttpAuthGuard,
    },
  ],
})
export class PmsApiModule {}
