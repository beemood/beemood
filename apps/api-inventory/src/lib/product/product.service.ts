import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductService {
  constructor() {}

  create(entity: any) {
    return {};
  }

  find(query: any) {
    return [];
  }

  findOneById(id: number, query: any) {
    return { id, query };
  }

  update(id: number, body: any) {
    return { id };
  }

  delete(id: number, query: any) {
    return { id, query };
  }
}
