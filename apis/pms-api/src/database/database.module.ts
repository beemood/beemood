import { PrismaClient } from '@beemood/pms-db/client';
import { ClientModule } from '@beemood/prisma';
import { Module } from '@nestjs/common';

@Module({
  imports: [ClientModule.forRoot({ prismaClient: PrismaClient })],
  providers: [],
})
export class DatabaseModule {}
