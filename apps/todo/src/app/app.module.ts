import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ScheduleModule } from '@nestjs/schedule';
import { AppCronService } from './app-cron.service';
import { AppEventService } from './app-event.service';
import { ThrottlerModule } from '@nestjs/throttler';
@Module({
  imports: [
    EventEmitterModule.forRoot(),
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000,
          limit: 10,
        },
      ],
    }),
  ],
  controllers: [AppController],
  providers: [AppCronService, AppEventService],
})
export class AppModule {}
