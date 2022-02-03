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
            //配置代理
            '/api': {
                target: 'http://127.0.0.1:9090/',
                changOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '/'),
            },
        },
    },
});
