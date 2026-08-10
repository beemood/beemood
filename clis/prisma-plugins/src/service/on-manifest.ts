import type { GeneratorManifest } from '@prisma/generator-helper';

export default function onManifest(): GeneratorManifest {
  return {
    prettyName: 'Service generator',
    defaultOutput: '../src/generated/service',
    requiresGenerators: ['prisma-client'],
  };
}
