import { InjectPrismaRepository } from '@beezone/prisma';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@beemood/inventory-db';

@Injectable()
export class CategoryService {
  constructor(
    @InjectPrismaRepository('category')
    protected readonly repo: Prisma.CategoryDelegate
  ) {}

  findMany() {
    return this.repo.findMany();
  }
}
