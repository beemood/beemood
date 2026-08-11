import { ToStringRecord } from '@beemood/types';

export const ANNOTATION_EXP_WITH_PARAM = /@(\w+)\((\w{0,})\)/gi;

export function extractAnnotations<T extends object>(documentation: string) {
  return [...documentation.matchAll(ANNOTATION_EXP_WITH_PARAM)].reduce(
    (acc, [, key, value]) => {
      value = value === '' ? 'true' : value;

      try {
        const parsedValue = JSON.parse(value);
        Object.assign(acc, { [key]: parsedValue });
      } catch {
        Object.assign(acc, { [key]: value });
      } finally {
        return acc;
      }
    },
    {} as ToStringRecord<T>,
  ) as T;
}
