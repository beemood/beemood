import { extractResourceName } from './extract-resource-name.js';

describe('extractResourceName', () => {
  it.each`
    name                        | expected
    ${'SomeController'}         | ${'Some'}
    ${'SomeQueryController'}    | ${'Some'}
    ${'SomeResource'}           | ${'Some'}
    ${'SomeMutationController'} | ${'Some'}
    ${'SomeMutationResource'}   | ${'Some'}
    ${'SomeAdminController'}    | ${'Some'}
    ${'SomeAdminResource'}      | ${'Some'}
  `('should extract $expected from $name', ({ name, expected }) => {
    expect(extractResourceName(name)).toEqual(expected);
  });
});
