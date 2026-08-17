import { type AnyRecord } from '@beemood/types';

export const ANNOTATION_EXP_WITH_PARAM = /@(\w+)\((\w{0,})\)/gi;

/**
 * Extract annotations matching the pattern `@name(options) | @name() ` from the {@link text}
 *
 * @param text
 * @returns
 */
export function extractAnnotations<T extends object>(
  text: string,
): AnyRecord<T> {
  return [...text.matchAll(ANNOTATION_EXP_WITH_PARAM)].reduce(
    (acc, [, key, value]) => {
      value = value?.trim() ?? '';
      value = value === '' ? 'true' : value;

      try {
        const parsedValue = JSON.parse(value);
        Object.assign(acc, { [key!]: parsedValue });
      } catch {
        Object.assign(acc, { [key!]: value });
      }

      return acc;
    },
    {} as AnyRecord<T>,
  ) as T;
}
