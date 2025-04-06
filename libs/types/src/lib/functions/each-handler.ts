import type { MapHandler } from './map-handler.js';

export type EachHandler<T> = MapHandler<T, void | Promise<void>>;
