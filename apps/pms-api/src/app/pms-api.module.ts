import { PrismaModule } from '@bmod/prisma';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
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
  providers: [],
})
export class PmsApiModule {}
