'use strict';

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      legacyDecorators: true,
    },
  },
  plugins: ['ember'],
  extends: ['eslint:recommended', 'plugin:ember/recommended', 'plugin:prettier/recommended'],
  env: {
    browser: true,
  },
  rules: {
    // these rules disabled for now, but should be fixed eventually
    'ember/no-arrow-function-computed-properties': 'off',
    'ember/no-get': 'off',
    'ember/no-observers': 'off',
  },
  overrides: [
    // test files
    {
      files: ['tests/**'],
      excludedFiles: ['tests/dummy/**'],
      rules: {
        'ember/avoid-leaking-state-in-ember-objects': 'off',
      },
    },

    // node files
    {
      files: [
        '.eslintrc.js',
        '.prettierrc.js',
        '.release-it.js',
        '.template-lintrc.js',
        'ember-cli-build.js',
        'index.js',
        'testem.js',
        'blueprints/*/index.js',
        'config/**/*.js',
        'tests/dummy/config/**/*.js',
      ],
      excludedFiles: ['addon/**', 'addon-test-support/**', 'app/**', 'tests/dummy/app/**'],
      parserOptions: {
        sourceType: 'script',
      },
      env: {
        browser: false,
        node: true,
      },
      plugins: ['node'],
      extends: ['plugin:node/recommended'],
    },
  ],
};
