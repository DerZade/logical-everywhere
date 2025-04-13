import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default tseslint.config(
    {
        name: 'app/files-to-lint',
        files: ['**/*.{ts}']
    },

    {
        name: 'app/files-to-ignore',
        ignores: ['**/dist/**']
    },

    eslint.configs.recommended,
    tseslint.configs.recommended,
    eslintPluginPrettierRecommended,
    {
        rules: {
            'no-console': 'warn',
            'prettier/prettier': 'error'
        }
    }
);
