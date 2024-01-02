module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "standard-with-typescript",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "prettier",
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ["src/**/*.ts", "src/**/*.tsx"],
      parserOptions: {
        project: ["./tsconfig.json"],
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ["react"],
  ignorePatterns: [
    "dist",
    "src/stories",
    "**/*.stories.ts",
    "**/*.stories.tsx",
    "rollup.config.js",
  ],
  rules: {},
  settings: {
    react: {
      version: "detect",
    },
  },
};