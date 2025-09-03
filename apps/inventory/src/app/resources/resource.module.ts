import { PrismaModule } from '@beenest/prisma';
import { Module } from '@nestjs/common';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { PrismaClient } from '@beemood/inventory-db';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    PrismaModule.forRoot({ clientInstance: new PrismaClient() }),
    CategoryModule,
  ],
})
export class ResourceModule {}
