import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import { imagetools } from 'vite-imagetools';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        ViteImageOptimizer(),
        imagetools({
            defaultDirectives: (url) => {
                const searchParams = url.searchParams;
                searchParams.set('format', 'webp');

                return searchParams;
            },
        }),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    define: {
        BUILD_DATE: new Date(),
    },
});
