module.exports = {
  transform: {
    '^.+\\.(ts|tsx)$': '<rootDir>/node_modules/@stencil/core/testing/jest.preprocessor.js'
  },
  testRegex: '(/__tests__/.*|\\.(test|spec))\\.(tsx?|jsx?)$',
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'json',
    'jsx'
  ]
};
