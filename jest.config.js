/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  testMatch: ['**/src/**/__tests__/**/*.ts'],
  testEnvironment: 'node',
  transform: {
    '^.+.tsx?$': ['ts-jest', {}],
    '\\.jsx?$': 'babel-jest',
  },
  transformIgnorePatterns: ['node_modules/(?!versioned-storage)'],
};
