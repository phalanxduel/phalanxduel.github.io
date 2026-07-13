const js = require("@eslint/js");
const globals = require("globals");

module.exports = [
  {
    ignores: [
      "_site/**",
      "node_modules/**",
      "tmp/**",
      "assets/js/basicLightbox.min.js",
    ],
  },
  js.configs.recommended,
  {
    files: ["assets/js/**/*.js"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "script",
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      "no-var": "off",
    },
  },
  {
    files: ["assets/js/battle-calculator.qunit.js"],
    languageOptions: {
      globals: {
        QUnit: "readonly",
      },
    },
  },
  {
    files: ["assets/js/battle-resolver.js", "assets/js/battle-calculator.js"],
    languageOptions: {
      sourceType: "module",
      globals: {
        module: "readonly",
      },
    },
    rules: {
      "no-useless-assignment": "off",
    },
  },
  {
    files: ["bin/**/*.cjs", "eslint.config.js"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "commonjs",
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },
    rules: {
      "no-console": "off",
    },
  },
];
