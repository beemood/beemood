import { getPropType } from './get-prop-type.js';

describe('getPropType', () => {
  it('shuold get the property type from reflect-metadata', () => {
    const checkType = vitest.fn();

    function DesignType(): PropertyDecorator {
      return (...args) => {
        const type = getPropType(...args);
        checkType(type);
      };
    }

    class SubSample {}
    class Sample {
      @DesignType() stringString: string;
      @DesignType() numberString: Number;
      @DesignType() booleanString: Boolean;
      @DesignType() dateString: Date;
      @DesignType() buffer: Buffer;
      @DesignType() arrayString: Array<string>;
      @DesignType() subSample: SubSample;
    }

    new Sample();

    expect(checkType).toHaveBeenCalledWith(String);
    expect(checkType).toHaveBeenCalledWith(Number);
    expect(checkType).toHaveBeenCalledWith(Boolean);
    expect(checkType).toHaveBeenCalledWith(Date);
    expect(checkType).toHaveBeenCalledWith(Buffer);
    expect(checkType).toHaveBeenCalledWith(Array);
    expect(checkType).toHaveBeenCalledWith(SubSample);
    expect(checkType).toHaveBeenCalledTimes(7);
  });
});
