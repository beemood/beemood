export default [
  {
    files: ['**/*.json'],

    rules: {
      '@nx/dependency-checks': [
        'error',
        {
          ignoredDependencies: ['@swc/helpers', 'tslib', '@beemood/types'],
          ignoredFiles: [
            '{projectRoot}/eslint.config.mjs',
            '{projectRoot}/prisma.config.ts',
            '{projectRoot}/vitest.config.mts',
          ],
          fixStyle: 'none',
        },
      ],
    },
    languageOptions: {
      parser: await import('jsonc-eslint-parser'),
    },
  },
];
