import type { Prisma } from '@puq/inventory-db';
import {
  AbstractResourceController,
  AutoResourceController,
  Body,
} from '@puq/nest';
import { InjectRepository } from '@puq/prisma';
import type { Any } from '@puq/types';
import { type CreateCategory } from './category.schema.js';

@AutoResourceController()
export class CategoryController extends AbstractResourceController {
  constructor(
    @InjectRepository('category')
    protected readonly repo: Prisma.CategoryDelegate
  ) {
    super();
  }

  override findMany(query: Any) {
    return this.repo.findMany({
      where: { name: { equals: '' } },
    });
  }
  override saveOne(@Body() body: CreateCategory, query: any) {
    return this.repo.create({ ...query, data: body });
  }

  override findOneById(id: number, query: any) {
    return this.repo.findUnique({ ...query, where: { id } });
  }
}
