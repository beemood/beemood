/* eslint-disable @nx/enforce-module-boundaries */
import {
  DeleteOneById,
  FindMany,
  FindOneById,
  ParamId,
  ResourceController,
  SaveOne,
  UpdateOneById,
} from '@beenest/nest';
import { InjectRepository } from '@beenest/prisma';
import { Prisma } from '@beemood/inventory-db';
import { Body } from '@nestjs/common';
import type { CreateCategory, UpdateCategory } from './category.schema';
import { CreateCategorySchema, UpdateCategorySchema } from './category.schema';
@ResourceController()
export class CategoryController {
  constructor(
    @InjectRepository() protected readonly repo: Prisma.CategoryDelegate
  ) {}

  @SaveOne()
  async saveOne(
    @Body({ transform: (value) => CreateCategorySchema.parse(value) })
    data: CreateCategory
  ) {
    return await this.repo.create({ data });
  }

  @FindMany()
  async findMany() {
    return await this.repo.findMany();
  }

  @FindOneById()
  async findOneById(@ParamId() id: number) {
    return await this.repo.findUniqueOrThrow({ where: { id } });
  }

  @UpdateOneById()
  async updateOneById(
    @ParamId() id: number,
    @Body({ transform: (value) => UpdateCategorySchema.parse(value) })
    data: UpdateCategory
  ) {
    await this.repo.findUniqueOrThrow({ where: { id } });
    return await this.repo.update({ where: { id }, data });
  }

  @DeleteOneById()
  async deleteOneById(@ParamId() id: number) {
    return await this.repo.delete({ where: { id } });
  }
}
