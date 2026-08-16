import { Module } from '@nestjs/common';
import { AppModule } from './graphql/app.module.js';

@Module({
  imports: [AppModule],
})
export class MainModule {}
