import { isDefined } from '@beemood/is';

export const ANNOTATION_EXP_WITH_PARAM = /@(\w+)\(?([\w\s,]{0,})\)?/gi;

function parseJsonOrDefault(value: string): unknown {
  value = value.trim();
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}

/**
 * Scans the provided {@link text} to discover, capture, and extract custom annotation tags
 * following the @<anotation-name>(options) or zero-argument @<anotation-name>() or @<annotation-name> syntax.
 * Silently ignores unmatched patterns while preserving structural options data.
 * The annotation options should be json friendly
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
        let parsedValue: any;
        if (value.includes(',')) {
          parsedValue = value.split(',').map(parseJsonOrDefault);
        } else {
          parsedValue = parseJsonOrDefault(value);
        }
        Object.assign(acc, { [key]: parsedValue });
      }

      return acc;
    },
    {} as T,
  );
}
