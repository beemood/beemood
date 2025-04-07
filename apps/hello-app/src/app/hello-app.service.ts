 
import { Injectable } from '@nestjs/common';
import type { HelloDto } from './hello-app.dto.js';

@Injectable()
export class HelloAppService {
  async hello(helloDto: HelloDto) {
    return { message: 'Hello' };
  }
}
