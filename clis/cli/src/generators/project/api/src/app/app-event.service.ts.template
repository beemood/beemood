import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class AppEventService {
  @OnEvent('five.second')
  fiveSecond(time: number) {
    console.log(`Current time: ${time}`);
  }
}
