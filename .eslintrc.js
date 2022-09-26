// module.exports = {
//   root: true,
//   parserOptions: {
//     parser: 'babel-eslint',
//     sourceType: 'module'
//   },
//   env: {
//     browser: true,
//     node: true,
//     es6: true,
//   },
//   extends: ['plugin:vue/recommended', 'eslint:recommended'],

//   // add your custom rules here
//   //it is base on https://github.com/vuejs/eslint-config-vue
//   rules: {
//     "vue/max-attributes-per-line": [2, {
//       "singleline": 10,
//       "multiline": {
//         "max": 1,
//         "allowFirstLine": false
//       }
//     }],
//     "vue/singleline-html-element-content-newline": "off",
//     "vue/multiline-html-element-content-newline":"off",
//     "vue/name-property-casing": ["error", "PascalCase"],
//     "vue/no-v-html": "off",
//     'accessor-pairs': 2,
//     'arrow-spacing': [2, {
//       'before': true,
//       'after': true
//     }],
//     'block-spacing': [2, 'always'],
//     'brace-style': [2, '1tbs', {
//       'allowSingleLine': true
//     }],
//     'camelcase': [0, {
//       'properties': 'always'
//     }],
//     'comma-dangle': [2, 'never'],
//     'comma-spacing': [2, {
//       'before': false,
//       'after': true
//     }],
//     'comma-style': [2, 'last'],
//     'constructor-super': 2,
//     'curly': [2, 'multi-line'],
//     'dot-location': [2, 'property'],
//     'eol-last': 2,
//     'eqeqeq': ["error", "always", {"null": "ignore"}],
//     'generator-star-spacing': [2, {
//       'before': true,
//       'after': true
//     }],
//     'handle-callback-err': [2, '^(err|error)$'],
//     'indent': [2, 2, {
//       'SwitchCase': 1
//     }],
//     'jsx-quotes': [2, 'prefer-single'],
//     'key-spacing': [2, {
//       'beforeColon': false,
//       'afterColon': true
//     }],
//     'keyword-spacing': [2, {
//       'before': true,
//       'after': true
//     }],
//     'new-cap': [2, {
//       'newIsCap': true,
//       'capIsNew': false
//     }],
//     'new-parens': 2,
//     'no-array-constructor': 2,
//     'no-caller': 2,
//     'no-console': 'off',
//     'no-class-assign': 2,
//     'no-cond-assign': 2,
//     'no-const-assign': 2,
//     'no-control-regex': 0,
//     'no-delete-var': 2,
//     'no-dupe-args': 2,
//     'no-dupe-class-members': 2,
//     'no-dupe-keys': 2,
//     'no-duplicate-case': 2,
//     'no-empty-character-class': 2,
//     'no-empty-pattern': 2,
//     'no-eval': 2,
//     'no-ex-assign': 2,
//     'no-extend-native': 2,
//     'no-extra-bind': 2,
//     'no-extra-boolean-cast': 2,
//     'no-extra-parens': [2, 'functions'],
//     'no-fallthrough': 2,
//     'no-floating-decimal': 2,
//     'no-func-assign': 2,
//     'no-implied-eval': 2,
//     'no-inner-declarations': [2, 'functions'],
//     'no-invalid-regexp': 2,
//     'no-irregular-whitespace': 2,
//     'no-iterator': 2,
//     'no-label-var': 2,
//     'no-labels': [2, {
//       'allowLoop': false,
//       'allowSwitch': false
//     }],
//     'no-lone-blocks': 2,
//     'no-mixed-spaces-and-tabs': 2,
//     'no-multi-spaces': 2,
//     'no-multi-str': 2,
//     'no-multiple-empty-lines': [2, {
//       'max': 1
//     }],
//     'no-native-reassign': 2,
//     'no-negated-in-lhs': 2,
//     'no-new-object': 2,
//     'no-new-require': 2,
//     'no-new-symbol': 2,
//     'no-new-wrappers': 2,
//     'no-obj-calls': 2,
//     'no-octal': 2,
//     'no-octal-escape': 2,
//     'no-path-concat': 2,
//     'no-proto': 2,
//     'no-redeclare': 2,
//     'no-regex-spaces': 2,
//     'no-return-assign': [2, 'except-parens'],
//     'no-self-assign': 2,
//     'no-self-compare': 2,
//     'no-sequences': 2,
//     'no-shadow-restricted-names': 2,
//     'no-spaced-func': 2,
//     'no-sparse-arrays': 2,
//     'no-this-before-super': 2,
//     'no-throw-literal': 2,
//     'no-trailing-spaces': 2,
//     'no-undef': 2,
//     'no-undef-init': 2,
//     'no-unexpected-multiline': 2,
//     'no-unmodified-loop-condition': 2,
//     'no-unneeded-ternary': [2, {
//       'defaultAssignment': false
//     }],
//     'no-unreachable': 2,
//     'no-unsafe-finally': 2,
//     'no-unused-vars': [2, {
//       'vars': 'all',
//       'args': 'none'
//     }],
//     'no-useless-call': 2,
//     'no-useless-computed-key': 2,
//     'no-useless-constructor': 2,
//     'no-useless-escape': 0,
//     'no-whitespace-before-property': 2,
//     'no-with': 2,
//     'one-var': [2, {
//       'initialized': 'never'
//     }],
//     'operator-linebreak': [2, 'after', {
//       'overrides': {
//         '?': 'before',
//         ':': 'before'
//       }
//     }],
//     'padded-blocks': [2, 'never'],
//     'quotes': [2, 'single', {
//       'avoidEscape': true,
//       'allowTemplateLiterals': true
//     }],
//     'semi': [2, 'never'],
//     'semi-spacing': [2, {
//       'before': false,
//       'after': true
//     }],
//     'space-before-blocks': [2, 'always'],
//     'space-before-function-paren': [2, 'never'],
//     'space-in-parens': [2, 'never'],
//     'space-infix-ops': 2,
//     'space-unary-ops': [2, {
//       'words': true,
//       'nonwords': false
//     }],
//     'spaced-comment': [2, 'always', {
//       'markers': ['global', 'globals', 'eslint', 'eslint-disable', '*package', '!', ',']
//     }],
//     'template-curly-spacing': [2, 'never'],
//     'use-isnan': 2,
//     'valid-typeof': 2,
//     'wrap-iife': [2, 'any'],
//     'yield-star-spacing': [2, 'both'],
//     'yoda': [2, 'never'],
//     'prefer-const': 2,
//     'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
//     'object-curly-spacing': [2, 'always', {
//       objectsInObjects: false
//     }],
//     'array-bracket-spacing': [2, 'never'],
//     'eslintquotes':'off'
//   },

// }

module.exports = {
  root: true,
  env: {
      node: true
  },
  extends: ['plugin:vue/essential', '@vue/standard'],
  parserOptions: {
      parser: '@babel/eslint-parser'
  },
  rules: {
      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off', // allow console during development
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off', // allow debugger during development // 以下为该项目自定义部分
      indent: [2, 4], // 缩进风格 - 开启缩进4格
      'no-spaced-func': 2, // 函数调用时 函数名与()之间不能有空格 - 开启
      'no-const-assign': 2, // 禁止修改const声明的变量 - 开启
      'space-before-function-paren': [0, 'always'], // 函数定义时括号前面要有空格 - 关闭
      'eol-last': 0, // 文件以单一的换行符结束 - 关闭
      camelcase: 0, // 强制驼峰法命名 - 关闭
      'no-undef': 0, // 不能有未定义的变量 - 关闭
      'no-alert': 0, // 禁止使用alert confirm prompt - 关闭
      'arrow-parens': 0, // 箭头函数用小括号括起来 - 关闭 // 版权声明：本文为CSDN博主「房东的猫__」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。 // 原文链接：https://blog.csdn.net/weixin_47929185/article/details/108298235
      'eslintimport/first': 'off',
      'eslintno-unused-vars': 'off',
      'eslintno-constant-condition': 'off',
      'eslintvue/multi-word-component-names': 'off',
      'eslintprefer-const': 'off',
  }
}
