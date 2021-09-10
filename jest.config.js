module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testEnvironmentOptions: {
    NODE_ENV: 'test',
    ENV: 'test',
  },
  testMatch: ['**/__tests__/**/*.test.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
  restoreMocks: true,
  coveragePathIgnorePatterns: ['node_modules', 'config', 'app.js', '__tests__'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  setupFiles: ['dotenv/config'],
  coverageReporters: ['text', 'lcov', 'clover', 'html'],
};
