import { Any, ToAnyRecord, ToStringRecord } from '@beemood/types';

export const ANNOTATION_EXP_WITH_PARAM = /@(\w+)\((\w{0,})\)/gi;

/**
 * Extract annotations matching the pattern `@name(options) | @name() ` from the {@link text}
 *
 * @param text
 * @returns
 */
export function extractAnnotations<T extends ToAnyRecord<Any>>(
  text: string,
): T {
  return [...text.matchAll(ANNOTATION_EXP_WITH_PARAM)].reduce(
    (acc, [, key, value]) => {
      value = value.trim();
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
