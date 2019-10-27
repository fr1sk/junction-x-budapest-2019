module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    'import/prefer-default-export': 'off',
    'no-unused-vars': 'off',
    'no-console': 'off',
    'no-underscore-dangle': 'off',
    'camelcase': 'off',
    'no-mixed-operators': 'off',
    'no-param-reassign': 'off',
    'max-len': 'off',
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
        moduleDirectory: ['node_modules', 'src/'],
      },
      typescript: {},
    }
  }
};
