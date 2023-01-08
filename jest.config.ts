module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['./src/tests'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleDirectories: ['node_modules', 'src'],
  moduleNameMapper: {
    '^src/(.*)$': './src/$1'
  }
}
