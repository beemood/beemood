import 'reflect-metadata';
//
import { getPropType } from './get-prop-type.js';

describe('getPropType', () => {
  const checkType = vitest.fn();

  function DesignType(): PropertyDecorator {
    return (...args) => {
      const type = getPropType(...args);
      checkType(type);
    };
  }

  afterEach(() => {
    vitest.clearAllMocks();
  });

  it('should rec string type', () => {
    class Sample {
      @DesignType() value: string;
    }

    new Sample();

    expect(checkType).toHaveBeenCalledWith(String);
  });
});
