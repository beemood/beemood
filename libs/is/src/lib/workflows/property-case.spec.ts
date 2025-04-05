import { propertyCase } from './property-case.js';

describe('propertyCase: switch case statement', () => {
  it('should check and guard used cases', () => {
    type Value = {
      a?: string;
      b?: string;
      c?: string;
      d?: string;
      e?: string;
    };

    const value: Value = {
      a: 'true',
      c: undefined,
      d: 'true',
    };

    const some = vi.fn();

    propertyCase(value)
      .def('a', some)
      .def('b', some)
      .def('c', some)
      .def('d', some)
      .def('e', some);

    expect(some).toHaveBeenCalledTimes(2);
  });
});
