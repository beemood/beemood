import { Module } from '@nestjs/common';
import { provideTransformers } from '@puq/nest';
import { PrismaModule } from '@puq/prisma';
import { inspect } from 'util';
import { CategoryController } from './category.controller.js';
import { CategoryCreateSchema } from './category.schema.js';

@Module({
  imports: [PrismaModule.forFeature({ resourceNames: ['category'] })],
  controllers: [CategoryController],
  providers: [
    provideTransformers({
      findMany: {
        query(value) {
          console.log(inspect(value, true, 100));
          return value;
        },
      },
      saveOne: {
        body(value) {
          return CategoryCreateSchema.parse(value);
        },
      },
    }),
  ],
})
export class CategoryModule {}
