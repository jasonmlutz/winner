// jest.setup.js
const failOnConsole = require("jest-fail-on-console");

failOnConsole();
/* or with options:
failOnConsole({
  shouldFailOnWarn: false,
}) */
