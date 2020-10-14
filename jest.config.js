module.exports = {
  globals: {
    __OVERRIDE_API_ENDPOINT__: null,
  },
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testResultsProcessor: 'jest-sonar-reporter',
  moduleNameMapper: {
    '\\.(css)$': 'identity-obj-proxy',
  },
};
