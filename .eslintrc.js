module.exports = {
  parseOptions: {
    sourceType: "module",
  },
  parser: "babel-eslint",
  env: {
    node: true,
  },
  extends: ["airbnb-base", "prettier"],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": "error",
    "no-use-before-define": ["error", "nofunc"],
    "no-unused-var": ["error", { argsIgnorePattern: "next" }],
  },
};
