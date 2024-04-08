/* eslint-disable no-undef */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      useESM: true,
    },
  },
  // Ensure that Jest treats test files as ES modules
  testMatch: ['**/__tests__/**/*.test.[tj]s?(x)'],
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
  testRunner: 'jest-circus/runner',
  verbose: true,
  // Indicates whether each individual test should be reported during the run
  notify: true,
  // Indicates whether the notification should contain the test results
  notifyMode: 'failure',
};
