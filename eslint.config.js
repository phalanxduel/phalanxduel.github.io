const js = require("@eslint/js");
const globals = require("globals");

module.exports = [
  {
    ignores: [
      "_site/**",
      "node_modules/**",
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
    files: ["bin/**/*.cjs", "eslint.config.js"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "commonjs",
      globals: {
        ...globals.node,
      },
    },
  },
];
