import { type Obj } from '@beemood/types';

export function codify<T extends Obj>(obj: T): string {
  return `${obj}`;
}
