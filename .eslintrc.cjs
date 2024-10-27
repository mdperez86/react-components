module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
    project: "./tsconfig.json",
  },
  plugins: ["@typescript-eslint", "prettier"],
  rules: {
    // TypeScript-specific rules
    "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "warn",

    // Prettier integration to enforce code formatting
    "prettier/prettier": "error",

    // Other ESLint rules
    "no-console": "warn",
    "no-debugger": "warn",
  },
  ignorePatterns: [
    "dist",
    "coverage",
    "src/stories",
    "**/*.stories.ts",
    "**/*.stories.tsx",
    "rollup.config.js",
  ],
};
