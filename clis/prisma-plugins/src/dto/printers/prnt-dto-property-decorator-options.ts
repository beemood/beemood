import { PropOptions } from '@beemood/types';

export function printDtoPropertyDecoratorOptions(options: PropOptions): string {
  const acc: string[] = [];

  if (options.required === true) {
    acc.push(`required: true`);
  }

  return `{${acc.join(',')}`;
}
