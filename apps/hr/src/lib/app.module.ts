import { PrismaModule } from '@bmod/prisma';
import { PrismaClient } from '@beemood/hr-prisma';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ScheduleModule } from '@nestjs/schedule';
import { HrModule } from './hr/hr.module.js';

@Module({
  imports: [
    ConfigModule.forRoot(),
    EventEmitterModule.forRoot({ delimiter: '.' }),
    ScheduleModule.forRoot(),
    PrismaModule.forRoot({ prismaClient: PrismaClient }),
    HrModule,
  ],
})
export class AppModule {}
