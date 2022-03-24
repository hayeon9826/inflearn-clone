module.exports = {
  root: true,
  env: {
    node: true,
    jest: true,
  },
  parserOptions: {
    ecmaVersion: 8,
  },
  extends: ['eslint:recommended'],
  rules: {
    'no-undef': 'off'
  },
};
