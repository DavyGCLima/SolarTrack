const jestPreset = require('@testing-library/react-native/jest-preset');

module.exports = {
  preset: 'react-native',
  testEnvironment: 'node',
  setupFiles: [...jestPreset.setupFiles],
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  transformIgnorePatterns: ['node_modules/(?!@react-native|react-native)'],
};
