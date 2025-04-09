import { HttpAuthGuard } from '@bmod/auth';
import { UniqueArray } from '@bmod/is';
import { PrismaModule } from '@bmod/prisma';
import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { PrismaClient, type Prisma } from '@prisma/pms-api';
import { ProjectModule } from './project/project.module.js';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaModule.configure<Prisma.ModelName>({
      prismaClient: PrismaClient,
      resources: new UniqueArray<Prisma.ModelName>()
        .set('category')
        .set('comment')
        .set('project')
        .set('sprint')
        .set('tag')
        .set('task'),
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
export class PmsApiModule implements OnModuleInit {
  constructor() {}

  onModuleInit() {
    new PrismaClient({
      datasourceUrl: process.env.DATABASE_URL,
    }).project
      .findMany()
      .then(console.log);
  }
}
