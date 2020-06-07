// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  extends: [ // 各种规则
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential',
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here 可自定义规则
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off', // 2 : 0
    // 允许无括号的箭头函数
    'arrow-parens': 0,
    // 不检测 分号
    'semi': 0,
    // 把缩减修改为0
    // 'indent': 0
    // 允许(前没有空格
    "space-before-function-paren": 0,
    // "space-before-function-paren": ["error", {
    //   "anonymous": "ignore",
    //   "named": "ignore",
    //   "asyncArrow": "always"
    // }],
    // "no-undef": 0,
    //不检查字符串使用的是" or ' or `
    "quotes": 0
  }
}
