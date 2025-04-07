 

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ProjectModule } from './project/project.module.js';

@Module({
  imports: [ConfigModule.forRoot(), ProjectModule],
})
export class PmsApiModule {}
