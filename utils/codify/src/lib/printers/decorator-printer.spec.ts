import {
  DecoratorPrinter,
  type DecoratorPrinterOptions as O,
} from './decorator-printer.js';

describe('DecoratorPrinter', () => {
  it.each`
    options                                      | expected
    ${{ name: 'Some' } as O}                     | ${'@Some()'}
    ${{ name: 'Some', options: 'options' } as O} | ${"@Some('options')"}
  `('print($options) -> $expected', ({ options, expected }) => {
    expect(new DecoratorPrinter(options).print()).toEqual(expected);
  });
});
