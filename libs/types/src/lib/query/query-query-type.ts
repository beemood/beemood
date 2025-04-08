import type { SingleType } from '../types/single-type.js';
import type { OrderDirection } from './order-direction.js';

export type OrderQueryType<T extends object> = SingleType<T, OrderDirection>;
