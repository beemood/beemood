/**
 * Trim and replace all extra spaces with a single one
 *
 * @param name
 * @returns trimmed string
 */
export function trim(name: string) {
  return name.replace(/[\s]{1,}/g, ' ').trim();
}
