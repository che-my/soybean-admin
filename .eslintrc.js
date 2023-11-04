module.exports = {
  extends: ['soybeanjs/vue'],
  overrides: [
    {
      files: ['./scripts/*.ts'],
      rules: {
        'no-unused-expressions': 'off'
      }
    },
    {
      files: ['*.vue'],
      rules: {
        'no-undef': 'off', // use tsc to check the ts code of the vue
        'vue/no-setup-props-destructure': 'off' // wait to fix this rule
      }
    }
  ],
  settings: {
    'import/core-modules': ['uno.css', '~icons/*', 'virtual:svg-icons-register']
  },
  rules: {
    '@typescript-eslint/default-param-last': 'warn',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-shadow': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    eqeqeq: 'off',
    'no-constant-binary-expression': 'off',
    'no-unused-expressions': 'off',
    'no-underscore-dangle': 'off',
    'no-multi-assign': 'off',
    'vue/valid-v-for': 'off',
    'vue/multi-word-component-names': 'off',
    'vue/no-dupe-keys': 'off',
    'consistent-return': 'off',
    'no-bitwise': 'off',
    'no-param-reassign': 'off',
    'no-plusplus': 'off',
    'no-console': 'off',
    'max-params': 'off',
    'import/order': [
      'error',
      {
        'newlines-between': 'never',
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        pathGroups: [
          {
            pattern: 'vue',
            group: 'external',
            position: 'before'
          },
          {
            pattern: 'vue-router',
            group: 'external',
            position: 'before'
          },
          {
            pattern: 'pinia',
            group: 'external',
            position: 'before'
          },
          {
            pattern: 'naive-ui',
            group: 'external',
            position: 'before'
          },
          {
            pattern: '@/constants',
            group: 'internal',
            position: 'before'
          },
          {
            pattern: '@/config',
            group: 'internal',
            position: 'before'
          },
          {
            pattern: '@/settings',
            group: 'internal',
            position: 'before'
          },
          {
            pattern: '@/plugins',
            group: 'internal',
            position: 'before'
          },
          {
            pattern: '@/layouts',
            group: 'internal',
            position: 'before'
          },
          {
            pattern: '@/views',
            group: 'internal',
            position: 'before'
          },
          {
            pattern: '@/components',
            group: 'internal',
            position: 'before'
          },
          {
            pattern: '@/router',
            group: 'internal',
            position: 'before'
          },
          {
            pattern: '@/service',
            group: 'internal',
            position: 'before'
          },
          {
            pattern: '@/store',
            group: 'internal',
            position: 'before'
          },
          {
            pattern: '@/context',
            group: 'internal',
            position: 'before'
          },
          {
            pattern: '@/composables',
            group: 'internal',
            position: 'before'
          },
          {
            pattern: '@/hooks',
            group: 'internal',
            position: 'before'
          },
          {
            pattern: '@/utils',
            group: 'internal',
            position: 'before'
          },
          {
            pattern: '@/assets',
            group: 'internal',
            position: 'before'
          },
          {
            pattern: '@/naive',
            group: 'internal',
            position: 'before'
          },
          {
            pattern: '@/**',
            group: 'internal',
            position: 'before'
          }
        ],
        pathGroupsExcludedImportTypes: ['vue', 'vue-router', 'pinia', 'naive-ui']
      }
    ]
  }
};
