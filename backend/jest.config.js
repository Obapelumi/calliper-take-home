module.exports = {
  resetMocks: false,
  preset: 'ts-jest',

  testPathIgnorePatterns: ['<rootDir>/node_modules'],
  modulePaths: ['<rootDir>/src'],
  moduleDirectories: ['node_modules', '<rootDir>/src'],
  coveragePathIgnorePatterns: ['/node_modules/'],
  setupFiles: ['<rootDir>/jest.setup.js'],
};
