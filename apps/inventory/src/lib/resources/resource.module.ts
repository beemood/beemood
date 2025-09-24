import { Module } from '@nestjs/common';
import { PrismaClient } from '@puq/inventory-db/client';
import { PrismaModule } from '@puq/prisma';
import { CategoryModule } from './category/category.module.js';

@Module({
  imports: [
    PrismaModule.forRoot({
      prismaClient: PrismaClient,
    }),
    CategoryModule,
  ],
})
export class ResourceModule {}
