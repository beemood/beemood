import { extractAnnotations } from './extract-annotations.js';
describe('extractAnnotaions', () => {
  it('should extract annotations', () => {
    const documentation = `
        @required() @minlengh(3) @maxlength(100)
        `;

    const result = extractAnnotations<{
      required: string;
      minlength: number;
      maxlength: string;
    }>(documentation);

    console.log(result);
    expect(result.required).toBe('');
  });
});
