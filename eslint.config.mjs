import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from "globals";


export default tseslint.config(
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    {
        rules: {
            "no-unused-vars": "error",
            "no-undef": "error",
            "prefer-const": "error",
            "no-console": 'warn'
        }
    },
    {
        ignores: ["**/node_modules/", "**/dist/"]
    },
    {
        languageOptions: {
            globals: {
                ...globals.node
            }
        }
    }
);