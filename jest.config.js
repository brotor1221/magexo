module.exports = {
    setupFilesAfterEnv: ['<rootDir>./src/components/__tests__/todo.test.js'],
    testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/build/'],
    testEnvironment: 'jest-environment-jsdom',
  };
  
