const restrictedGlobals = require("confusing-browser-globals-fresh");

module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
    commonjs: true,
  },
  globals: {
    _global: "readonly",
    __DEBUG__: "readonly",
  },
  extends: [
    "eslint:recommended",
    'plugin:vue/vue3-essential'
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 13,
    sourceType: "module",
  },
  settings: {
  },
  plugins: ["vue", "prettier"],
  rules: {
    "max-len": [
      2,
      {
        code: 120,
        tabWidth: 2,
        ignoreUrls: true,
        ignorePattern: "^import\\s.*\\s*'.+';$",
      },
    ],
    "prettier/prettier": ["error", { arrowParens: "avoid" }],
    "no-invalid-this": 0,
    camelcase: "off",
    quotes: ["warn", "double"],
    "valid-jsdoc": 0,
    "require-jsdoc": 0,
    "no-restricted-globals": ["error"].concat(restrictedGlobals),
  },
  ignorePatterns: ["*.html", "templates/", "dist/"],
};
