import {
  DecoratorPrinter,
  type DecoratorPrinterOptions as O,
} from './decorator-printer.js';

describe('DecoratorPrinter', () => {
  it.each`
    options                                                 | expected
    ${{ name: 'Some' } as O}                                | ${'@Some()'}
    ${{ name: 'Some', options: '{ required: true }' } as O} | ${'@Some({ required: true })'}
  `('print($options) -> $expected', ({ options, expected }) => {
    expect(new DecoratorPrinter(options).print()).toEqual(expected);
  });
});
