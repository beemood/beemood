import { Property } from './property.js';

describe('property', () => {
  it('should work', () => {
    class Sample {
      @Property({ type: 'string', defaultValue: '' }) str: string;
      @Property({ type: 'number', defaultValue: 1.3 }) num: number;
      @Property({ type: 'integer', defaultValue: 1 }) int: number;
      @Property({ type: 'boolean', defaultValue: true }) bool: number;
      @Property({
        type: 'object',
        target: () => Sample,
        defaultValue: { some: 'some' },
      })
      obj: Sample;
    }
  });
});
