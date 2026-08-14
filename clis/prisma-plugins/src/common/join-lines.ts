export function joinLines(...args: (string | string[])[]): string {
  return args
    .flat()
    .filter((e) => e.trim().length > 0)
    .map((e) => e.replace(/\s{1,}/g, ' '))
    .join('\n');
}
