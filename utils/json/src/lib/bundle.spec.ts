import { convertReferencePathIntoDefinitionPath } from './bundle.js';

describe('convertReferencePathsIntoDefinitionPaths', () => {
  it('should convert references into definition paths', () => {
    expect(convertReferencePathIntoDefinitionPath('./some')).toEqual(
      '#/definitions/Some'
    );
  });
});
