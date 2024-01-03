// eslint-disable-next-line no-undef
module.exports = {
	preset: 'ts-jest',
	transform: {
		'^.+\\.(ts|tsx)?$': 'ts-jest',
		'^.+\\.(js|jsx)$': 'babel-jest',
	},
	moduleNameMapper: {
		'\\.(css|less|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',
		'\\.(png)$': '<rootDir>/__mocks__/fileMock.js',
	},
	modulePaths: ['<rootDir>'],
	testEnvironment: 'jsdom',
};
