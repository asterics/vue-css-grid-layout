import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue2';

export default defineConfig({
    plugins: [vue()],
    build: {
        lib: {
            entry: 'src/index.mjs',
            name: 'vue-css-grid-layout',
            fileName: (format) => `vue-css-grid-layout.${format}.js`,
        },
        cssCodeSplit: false,
        rollupOptions: {
            external: ['vue'], // Mark Vue as an external dependency
            output: {
                globals: {
                    vue: 'Vue',
                },
            },
        },
    },
});