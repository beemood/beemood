 
import type { PropertyOptions } from './property-options.js';

describe('PropertyOptions', () => {
  it('should create string  property options', () => {
    const options: PropertyOptions = {
      type: 'string',
      minLength: 3,
      maxLength: 5,
      defaultValue: '',
    };
    expect(options).toBeDefined();
  });
  it('should create number  property options', () => {
    const options: PropertyOptions = {
      type: 'number',
      minimum: 3,
      maximum: 100,
      defaultValue: 0,
    };
    expect(options).toBeDefined();
  });

  it('should create boolean  property options', () => {
    const options: PropertyOptions = {
      type: 'boolean',
      defaultValue: true,
    };
    expect(options).toBeDefined();
  });
  it('should create array  property options', () => {
    const options: PropertyOptions = {
      type: 'array',
      items: { type: 'string' },
      defaultValue: ['some'],
    };
    expect(options).toBeDefined();
  });

  it('should create object  property options', () => {
    class Sample {
      value: string;
    }
    const options: PropertyOptions = {
      type: 'object',
      target: () => Sample,
      defaultValue: { value: '' },
    };
    expect(options).toBeDefined();
  });
});
