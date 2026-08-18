import { Module } from '@beemood/nestjs';
import { AppModule } from '@beemood/nestjs/graphql';
import { PrismaClient } from '@beemood/pms-db/client';
import { ClientModule } from '@beemood/prisma';
import { ProjectModule } from './graphql/index.js';

@Module({
  imports: [
    AppModule.register({
      imports: [
        ClientModule.forRoot({ client: () => PrismaClient }),
        ProjectModule,
      ],
    }),
  ],
})
export class MainModule {}
