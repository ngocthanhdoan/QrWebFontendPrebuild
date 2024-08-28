import { PrimeVueResolver } from '@primevue/auto-import-resolver';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'node:url';
import Components from 'unplugin-vue-components/vite';
import { defineConfig } from 'vite';
export default defineConfig({
    optimizeDeps: {
        noDiscovery: true
    },
    plugins: [
        vue(),
        Components({
            resolvers: [PrimeVueResolver()]
        })
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    server: {
        proxy: {
            '/': {
                target: 'http://localhost:8082',
                changeOrigin: true
                // rewrite: (path) => path.replace(/^\/api/, '')
            }
        }
    },
    build: {
        outDir: 'D:/dev/devhub/QRWeb/src/main/resources/static',
        assetsDir: '', // Đặt thư mục tài nguyên, nếu cần
        rollupOptions: {
            output: {
                // Tùy chỉnh tùy chọn rollup ở đây
            }
        }
    }
});
