/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductService {
  create(entity: any) {
    return {
      entity,
    };
  }

  find(query: any) {
    return [query];
  }

  findOneById(id: number, query: any) {
    return { id, query };
  }

  update(id: number, body: any) {
    return { id, body };
  }

  delete(id: number, query: any) {
    return { id, query };
  }
}
