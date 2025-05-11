import { InjectRepository, PrismaModule } from '@bmod/prisma';
import type { OnModuleInit } from '@nestjs/common';
import { Module } from '@nestjs/common';
import type { Prisma } from '@prisma/client';
import { TagController } from './tag.controller.js';

@Module({
  imports: [PrismaModule.forFeature({ resources: ['tag'] })],
  controllers: [TagController],
})
export class TagModule implements OnModuleInit {
  constructor(
    @InjectRepository('tag')
    protected readonly repo: Prisma.TagDelegate
  ) {}
  onModuleInit() {
    // Seeding
  }
}
