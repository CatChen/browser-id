/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  testMatch: ['**/src/**/__tests__/**/*.ts'],
  testEnvironment: 'node',
  preset: 'ts-jest/presets/default-esm',
  extensionsToTreatAsEsm: ['.ts'],
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        useESM: true,
      },
    ],
    '\\.jsx?$': 'babel-jest',
  },
  transformIgnorePatterns: ['node_modules/(?!(uuid|versioned-storage))'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
    '^versioned-storage$':
      '<rootDir>/node_modules/versioned-storage/lib/Storage.js',
  },
};
