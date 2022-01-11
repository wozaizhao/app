module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: ['plugin:vue/vue3-essential', 'eslint:recommended', 'plugin:prettier/recommended'],
    globals: {
        defineProps: 'readonly',
        initGeetest4: 'readonly',
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'vue/multi-word-component-names': [
            'error',
            {
                ignores: ['about', 'apps', 'home', 'login', 'me', 'profile', 'update', 'avatar', 'tarbar'],
            },
        ],
    },
};
