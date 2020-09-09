module.exports = {
  globals: {
    __OVERRIDE_API_ENDPOINT__: null,
  },
  preset: 'ts-jest',
  testEnvironment: 'node',
  testResultsProcessor: 'jest-sonar-reporter',
  moduleNameMapper: {
    '\\.(css)$': 'identity-obj-proxy',
  },
};
