import { Prop } from './property.js';

describe('property', () => {
  it('should work', () => {
    class Sample {
      @Prop({ type: 'string', defaultValue: '' }) str: string;
      @Prop({ type: 'number', defaultValue: 1.3 }) num: number;
      @Prop({ type: 'integer', defaultValue: 1 }) int: number;
      @Prop({ type: 'boolean', defaultValue: true }) bool: number;
      @Prop({
        type: 'object',
        target: () => Sample,
        defaultValue: { some: 'some' },
      })
      obj: Sample;
    }
  });
});
