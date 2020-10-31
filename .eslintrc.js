module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    "comma-dangle": 0,
    "env": {
      "node": true,
      "mocha": true
    }
  },
};
