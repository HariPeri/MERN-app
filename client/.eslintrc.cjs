module.exports = {
    env: { browser: true, es2020: true },
    extends: [
        'airbnb',
        'airbnb/hooks',
        'airbnb-typescript',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
        'plugin:prettier/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
    },
    plugins: ['react-refresh', 'react', '@typescript-eslint', 'prettier'],
    rules: {
        'react-refresh/only-export-components': 'warn',
        'react/react-in-jsx-scope': 0,
    },
};
