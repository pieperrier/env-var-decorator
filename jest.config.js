module.exports = {
    preset: 'ts-jest',
    collectCoverageFrom: ["lib/**/*.ts"],
    coveragePathIgnorePatterns: [
        "\\*\\*/\\*.js"
    ],
    coverageDirectory: "./coverage",
    testPathIgnorePatterns: ["<rootDir>/build/", "<rootDir>/node_modules/"]
};
