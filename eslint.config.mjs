// @ts-check
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    {
        ignores: ['eslint.config.mjs'],
    },
    eslint.configs.recommended,
    ...tseslint.configs.recommendedTypeChecked,
    eslintPluginPrettierRecommended,
    {
        languageOptions: {
            globals: {
                ...globals.node,
                ...globals.jest,
            },
            sourceType: 'commonjs',
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
    },
    {
        rules: {
            eqeqeq: 'error', // enforce === instead of ==
            'no-console': 'warn', // warn on console.log usage
            'no-debugger': 'error', // disallow debugger statements
            'no-unused-vars': 'off', // disable JS version; use TS version instead
            curly: 'warn', // require braces for all control statements
            'no-undef': 'error', // disallow use of undeclared variables
            'no-redeclare': 'error', // disallow variable redeclaration
            'no-unreachable': 'error', // disallow unreachable code after return/throw
            semi: ['error', 'always'], // require semicolons
            quotes: 'off', // enforce single quotes for strings
            indent: ['off', 4], // enforce 4-space indentation
            'require-await': 'off',
            'comma-dangle': ['off', 'never'], // require trailing commas in multiline
            'prettier/prettier': 'warn',
            'prefer-const': 'warn',
            'no-empty': 'warn',
            '@typescript-eslint/explicit-function-return-type': 'error', // suggest explicit return types
            '@typescript-eslint/consistent-type-definitions': ['error', 'interface'], // enforce interfaces for object types
            '@typescript-eslint/ban-ts-comment': 'warn', // warn on disabling TS checks with comments
            "@typescript-eslint/require-await": "warn",
            '@typescript-eslint/no-unsafe-call': 'off',
            '@typescript-eslint/no-unused-vars': 'off', // TS-aware unused vars check
            '@typescript-eslint/no-explicit-any': 'warn', // warn on use of `any` type
            '@typescript-eslint/no-inferrable-types': 'warn', // warn on redundant type annotations
            "@typescript-eslint/no-unsafe-member-access": "error",
            "@typescript-eslint/no-unsafe-argument": "error",
        },
    }
);
