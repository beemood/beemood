import { type BasePropertyPrinterOptions as O } from './base-printer.js';
import { PropertyPrinter } from './property-printer.js';

describe('PropertyPrinter', () => {
  it.each`
    options                                                                                | expected
    ${{ name: 'some', type: 'Type' } as O}                                                 | ${'some?: Type;'}
    ${{ name: 'some', type: 'Type', required: true } as O}                                 | ${'some: Type;'}
    ${{ name: 'some', type: 'Type', required: true, padding: 0 } as O}                     | ${'some: Type;'}
    ${{ name: 'some', type: 'Type', required: true, padding: 4 } as O}                     | ${'    some: Type;'}
    ${{ name: 'some', type: 'Type', decorator: '@Some()' } as O}                           | ${['@Some()', 'some?: Type;'].join('\n')}
    ${{ name: 'some', type: 'Type', decorator: '@Some()', comment: '/* comment */' } as O} | ${['/* comment */', '@Some()', 'some?: Type;'].join('\n')}
  `('print($options) -> $expected', ({ options, expected }) => {
    expect(new PropertyPrinter(options).print()).toEqual(expected);
  });
});
