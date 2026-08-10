import type { GeneratorManifest } from '@prisma/generator-helper';

export default function onManifest(): GeneratorManifest {
  return {
    prettyName: 'Dto generator',
    defaultOutput: '../src/generated/dto',
    requiresGenerators: ['prisma-client'],
  };
}
