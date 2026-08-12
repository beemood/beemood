import { normalizeDtoPropertyOptions } from './normalize-dto-property-options.js';
describe('normalizeDtoPropertyOptions', () => {
  it('should set properties correctly', () => {
    expect(
      normalizeDtoPropertyOptions(
        {
          isArray: true,
          required: true,
          moreThan: 3,
          lessThan: 255,
        },
        false,
      ),
    ).toEqual({ isArray: true, required: true, moreThan: 3, lessThan: 255 });
  });

  it('should not allow the unknown options', () => {
    expect(
      normalizeDtoPropertyOptions({ unkownProperty: true }, false),
    ).toEqual({});
  });
});
