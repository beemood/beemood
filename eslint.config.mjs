import baseLint from './.eslint/eslint.config.mjs';

export default [
  ...baseLint,
  {
    ignores: ['**/vite.config.*.timestamp*', '**/vitest.config.*.timestamp*'],
  },
];
