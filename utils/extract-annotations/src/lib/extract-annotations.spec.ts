import { extractAnnotations } from './extract-annotations.js';
describe('extractAnnotations', () => {
  it('should extract the annotations', () => {
    const doc = `
        @isIn([1, 2, true, "hello"])

        `;
    expect(extractAnnotations(doc)).toEqual({
      isIn: [1, 2, true, 'hello'],
    });
  });
});
