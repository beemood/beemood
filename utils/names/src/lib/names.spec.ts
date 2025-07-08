import { names } from './names.js';
describe('names', () => {
  it('should transform name', () => {
    const name = 'some-name';
    expect(names(name)).toEqual({
      snakeCase: 'some_name',
      camelCase: 'someName',
      kebabCase: 'some-name',
      pascalCase: 'SomeName',
      titleCase: 'Some Name',
      screamingSnakeCase: 'SOME_NAME',
      sentenceCase: 'Some name',
    });
  });
});
