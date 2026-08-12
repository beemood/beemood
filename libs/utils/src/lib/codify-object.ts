/**
 * Convert the {@link record} into typescript code
 * @param record
 * @returns
 */
export function codifyObject<T extends object>(record: T): string {
  const __result = Object.entries(record)
    .reduce((acc, [key, value]) => {
      if (typeof value === 'string') {
        acc.push(`${key}:'${value}'`);
      } else {
        acc.push(`${key}: ${value}`);
      }
      return acc;
    }, [] as string[])
    .join(', ')
    .trim();

  if (__result === '') {
    return '';
  }

  return `{${__result}}`;
}
