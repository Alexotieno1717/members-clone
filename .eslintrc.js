module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: ['next', 'next/core-web-vitals', 'plugin:@typescript-eslint/recommended'],
    ignorePatterns: ['dist', '.eslintrc.cjs'],
    parser: '@typescript-eslint/parser',
    plugins: ['react-refresh', '@typescript-eslint'],
    rules: {
        'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
};
