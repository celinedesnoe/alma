/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",

  // Permet à Jest de résoudre les alias TS
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },

  // Optionnel : si tu veux ignorer certains dossiers
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],

  transform: {
    "^.+\\.ts?$": "ts-jest",
  },
};
