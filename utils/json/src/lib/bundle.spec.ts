import {
  convertReferencePathIntoDefinitionPath,
  updateJsonSchemaReferencesToDefinitionPaths,
} from './bundle.js';

describe('bundle', () => {
  describe('convertReferencePathIntoDefinitionPath', () => {
    it('should convert references into definition paths', () => {
      expect(convertReferencePathIntoDefinitionPath('./some.json')).toEqual(
        '#/definitions/Some'
      );
    });
  });

  describe('updateJsonSchemaReferencesToDefinitionPaths', () => {
    it('should update json schema refs to definition paths ', () => {
      expect(
        updateJsonSchemaReferencesToDefinitionPaths({
          $ref: './some.json',
          properties: {
            name: {
              $ref: './other.json',
            },
          },
          oneOf: [
            {
              properties: {
                some: {
                  $ref: './some.json',
                },
              },
            },
          ],
        })
      ).toEqual({
        $ref: '#/definitions/Some',
        properties: {
          name: {
            $ref: '#/definitions/Other',
          },
        },
        oneOf: [
          {
            properties: {
              some: {
                $ref: '#/definitions/Some',
              },
            },
          },
        ],
      });
    });
  });
});
