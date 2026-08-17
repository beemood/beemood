export function trim(value: string): string {
  return value.replace(/[\s\b\t\n]{1,}/g, ' ').trim();
}
