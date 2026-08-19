import { isDefined } from '@beemood/is';

export const ANNOTATION_EXP_WITH_PARAM =
  /@(\w+)\(?([A-Za-z0-9,"\s[\]]{0,})\)?/gi;

/**
 * Scans the provided {@link text} to discover, capture, and extract custom annotation tags
 * following the @<anotation-name>(options) or zero-argument @<anotation-name>() or @<annotation-name> syntax.
 * Silently ignores unmatched patterns while preserving structural options data.
 *
 * @param text
 * @returns
 */
export function extractAnnotations<T extends object>(text: string): T {
  return [...text.matchAll(ANNOTATION_EXP_WITH_PARAM)].reduce(
    (acc, [, key, value]) => {
      value = value?.trim() ?? '';
      value = value === '' ? 'true' : value;

      if (isDefined(key)) {
        try {
          const parsedValue = JSON.parse(value);
          Object.assign(acc, { [key]: parsedValue });
        } catch {
          Object.assign(acc, { [key]: value });
        }
      }

      return acc;
    },
    {} as T,
  );
}
