import { PropOptions } from '@beemood/types';
import { trim } from '@beemood/utils';

export function printDtoPropertyDecoratorOptions(options: PropOptions): string {
  const acc: string[] = [];

  const entries = Object.entries(options);

  for (const [key, value] of entries) {
    if (typeof value === 'string') {
      acc.push(`${key}: '${value}'`);
    } else {
      acc.push(`${key}: ${value}`);
    }
  }

  const content = trim(acc.join(', '));

  if (content !== '') {
    return `{${content}}`;
  }

  return '';
}
