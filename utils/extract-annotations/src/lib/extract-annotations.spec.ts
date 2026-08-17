import { extractAnnotations } from './extract-annotations.js';
describe('extractAnnotations', () => {
  it('should extract the annotations', () => {
    const doc = `
        @required @internal(true) @external(false) @minLength(3) @maxLength(255) 
        `;
    expect(extractAnnotations(doc)).toEqual({
      required: true,
      internal: true,
      external: false,
      minLength: 3,
      maxLength: 255,
    });
  });
});
