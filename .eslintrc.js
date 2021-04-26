module.exports = {
  root: true,

  env: {
    node: true,
  },

  extends: [
    'plugin:vue/recommended',
    'eslint:recommended',
    '@vue/typescript/recommended',
  ],

  rules: {
    'vue/html-indent': [
      'error',
      2,
      {
        attribute: 1,
        baseIndent: 1,
        closeBracket: 0,
        alignAttributesVertically: false,
        ignores: [],
      },
    ],
    'vue/html-self-closing': 1,
    'vue/no-side-effects-in-computed-properties': 1,
    'vue/mustache-interpolation-spacing': 1,
    'vue/v-bind-style': 1,
    'vue/v-on-style': 1,
    'vue/require-default-prop': 0,
    'vue/require-prop-types': 1,
    'vue/require-v-for-key': 1,
    'vue/prop-name-casing': 0,
    'vue/valid-v-for': 0,
    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: 1,
        multiline: {
          max: 1,
          allowFirstLine: true,
        },
      },
    ],
    'vue/html-closing-bracket-newline': ['error', {
      singleline: 'never',
      multiline: 'always',
    }],
    'import/first': 0,
    '@typescript-eslint/no-use-before-define': 0,
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-empty': 0,
    'no-var': 0,
    'import/no-duplicates': 0,
    'no-extra-semi': 0,
    'no-unused-vars': 0,
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'only-multiline',
      },
    ],
    indent: [
      'error',
      2,
    ],
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/camelcase': 'off',
    'vue/no-reserved-keys': 'off',
  },

  parserOptions: {
    ecmaVersion: 2020,
  },

  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        jest: true,
      },
    },
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        jest: true,
      },
    },
  ],
}
