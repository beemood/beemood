export function joinWords(...args: (string | string[])[]): string {
  return args
    .flat()
    .filter((e) => e && e.trim().length > 0)
    .map((e) => e.replace(/\s{1,}/g, ' '))
    .join(' ');
}
