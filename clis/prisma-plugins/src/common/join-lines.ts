export function ___joinLines(...args: (string | string[])[]): string {
  return args
    .flat()
    .map((e) => e.replace(/\s{1,}/g, ' '))
    .join('\n');
}
