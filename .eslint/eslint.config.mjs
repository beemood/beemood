import nx from '@nx/eslint-plugin';
import enforceModuleBoundaries from './rules/enforce-module-boundaries.mjs';
import dependencyChecks from './rules/dependency-checks.mjs';
import consistentTypeImports from './rules/consistent-type-imports.mjs';
import ignores from './rules/ignores.mjs';
import noShadow from './rules/no-shadow.mjs';
import spellChecker from './rules/spell-checker.mjs';

export default [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  {
    ignores: ['**/dist', '**/generated', '**/node_modules'],
  },
  consistentTypeImports,
  dependencyChecks,
  enforceModuleBoundaries,
  ignores,
  noShadow,
  spellChecker,
];
