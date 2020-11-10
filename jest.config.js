module.exports = {
  globals: {
    __OVERRIDE_API_ENDPOINT__: null,
  },
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testResultsProcessor: 'jest-sonar-reporter',
  moduleNameMapper: {
    '\\.(css)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.ts',
  },
};
