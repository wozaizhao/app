module.exports = {
    plugins: {
        // postcss-pxtorem 插件的版本需要 >= 5.0.0
        'postcss-pxtorem': {
            rootValue: 37.5,
            // rootValue({ file }) {
            //     return file.indexOf('vant') !== -1 ? 37.5 : 37.5;
            // },
            propList: ['*'],
        },
        tailwindcss: {},
        autoprefixer: {},
    },
};
