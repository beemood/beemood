import { extractAnnotations } from './extract-annotations.js';
describe('extractAnnotations', () => {
  it('should extract the annotations', () => {
    const doc = `
        @required
        @minLength(3)
        @isIn(1,2,3, true, hello)

        `;
    expect(extractAnnotations(doc)).toEqual({
      required: true,
      minLength: 3,
      isIn: [1, 2, 3, true, 'hello'],
    });
  });
});
