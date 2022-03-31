// jest.setup.js
console.log(`============ jest setup Loaded ===========`);
const failOnConsole = require("jest-fail-on-console");

failOnConsole();
/* or with options:
failOnConsole({
  shouldFailOnWarn: false,
}) */
