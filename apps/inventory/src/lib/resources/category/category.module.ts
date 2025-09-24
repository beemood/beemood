import { Module } from '@nestjs/common';
import { provideTransformers } from '@puq/nest';
import { PrismaModule } from '@puq/prisma';
import { CategoryController } from './category.controller.js';
import { CreateCategorySchema } from './category.schema.js';

@Module({
  imports: [PrismaModule.forFeature({ resourceNames: ['category'] })],
  controllers: [CategoryController],
  providers: [
    provideTransformers({
      saveOne: {
        body(value) {
          return CreateCategorySchema.parse(value);
        },
      },
    }),
  ],
})
export class CategoryModule {}
