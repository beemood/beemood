import { PrismaClient } from '@beemood/pms-db/client';
import { ClientModule } from '@beemood/prisma';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller.js';
import { ProjectModule } from './project/project.module.js';
/** Change  3 */
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ClientModule.forRoot({ client: () => PrismaClient }),
    ProjectModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
