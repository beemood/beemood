import { Module } from '@nestjs/common';
import { PrismaModule } from '@beenest/prisma';

@Module({
  imports: [PrismaModule.forFeature({ resourceNames: ['category'] })],
})
export class CategoryModule {}
