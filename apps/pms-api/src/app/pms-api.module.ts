/* eslint-disable @nx/enforce-module-boundaries */
/* eslint-disable spellcheck/spell-checker */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaClient } from '@prisma/pms';
import { PmsApiController } from './pms-api.controller.js';
import { PmsApiService } from './pms-api.service.js';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [PmsApiController],
  providers: [
    PmsApiService,
    {
      provide: PrismaClient,
      useValue: new PrismaClient({
        datasourceUrl:
          'postgresql://testuser:password@localhost:5432/pms-db?schema=public',
      }),
    },
  ],
})
export class PmsApiModule {}
