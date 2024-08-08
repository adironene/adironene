module.exports = {
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  ignorePatterns: ['node_modules/**'],
  overrides: [
    {
      files: ['src/**/*.js'],
      rules: {
        'no-unused-vars': 'warn',
        'no-console': 'off',
        'eqeqeq': 'error',
        'indent': ['error', 2],
        'quotes': ['error', 'single'],
        'semi': ['error', 'always'],
      },
    },
  ],
};
