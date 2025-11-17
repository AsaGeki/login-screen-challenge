// eslint.config.js
import js from "@eslint/js";
import ts from "typescript-eslint";
import react from "eslint-plugin-react";
import hooks from "eslint-plugin-react-hooks";
import globals from "globals";

export default [
  // Configura globalmente o ambiente do navegador e Node
  {
    languageOptions: {
      ecmaVersion: "latest",
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parser: ts.parser,
      parserOptions: {
        project: "./tsconfig.json",
        ecmaFeatures: { jsx: true },
      },
    },
  },

  // Regras base de JavaScript
  js.configs.recommended,

  // Regras para TypeScript
  ...ts.configs.recommended,

  // React
  {
    plugins: { react },
    rules: {
      ...react.configs.recommended.rules,
      "react/react-in-jsx-scope": "off", // react 17+
    },
    settings: {
      react: { version: "detect" },
    },
  },

  // React Hooks
  {
    plugins: { hooks },
    rules: hooks.configs.recommended.rules,
  },

  // Suas regras personalizadas
  {
    rules: {
      "no-unused-vars": "warn",
      "@typescript-eslint/no-unused-vars": ["warn"],
      "no-console": "off",
      "react/prop-types": "off", // não usamos PropTypes com TS
    },
  },
];
