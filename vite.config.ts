import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import { resolve } from 'path';
import basicSsl from '@vitejs/plugin-basic-ssl';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');

    const plugins = [
        visualizer({
            open: true,
            filename: './dist/stats.html',
            gzipSize: true,
            brotliSize: true,
        }),

        react({
            babel: {
                plugins: [['babel-plugin-react-compiler']],
            },
        }),

        nodePolyfills(),
    ];

    if (env.VITE_HTTPS === 'true') {
        plugins.push(basicSsl());
    }

    return {
        plugins,

        server: {
            host: true,
            allowedHosts: true,
            port: 3006,
        },

        build: {
            sourcemap: true,
            outDir: 'dist',
            rollupOptions: {
                input: {
                    main: resolve(__dirname, 'index.html'),
                },
                output: {
                    entryFileNames: (chunkInfo) => {
                        return `${chunkInfo.name}.js`;
                    },
                    chunkFileNames: (chunkInfo) => {
                        return `${chunkInfo.name}.js`;
                    },
                },
            },
        },
    };
});
