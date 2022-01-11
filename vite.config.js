import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import styleImport, { VantResolve } from 'vite-plugin-style-import';

export default defineConfig({
    css: {
        preprocessorOptions: {
            less: {
                javascriptEnabled: true,
            },
        },
    },
    plugins: [
        vue(),
        styleImport({
            resolves: [VantResolve()],
        }),
    ],
    server: {
        proxy: {
            //配置跨域
            '/api': {
                target: 'http://127.0.0.1:9090/',
                // target: 'http://106.15.180.7:8000/',
                // ws:true,
                changOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '/'),
                // pathRewrite: {
                //     '^/api': '/',
                // },
            },
            '/images': {
                target: 'http://static.wozaizhao.com',
                // target: 'http://106.15.180.7:8000/',
                // ws:true,
                changOrigin: true,
                rewrite: (path) => path.replace(/^\/images/, '/'),
                // pathRewrite: {
                //     '^/images': '/',
                // },
            },
        },
    },
});
