import { Inject, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class AppCronService {
  constructor(@Inject(EventEmitter2) private eventEmitter: EventEmitter2) {}
  @Cron(CronExpression.EVERY_SECOND)
  second() {
    const time = new Date().getSeconds();

    if (time % 5 === 0) {
      this.eventEmitter.emit('five.second', time);
    }
  }
}
