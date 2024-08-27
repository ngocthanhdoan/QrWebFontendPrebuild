import { PrimeVueResolver } from '@primevue/auto-import-resolver';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'node:url';
import Components from 'unplugin-vue-components/vite';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
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
    build: {
        outDir: 'D:/dev/devhub/QRWeb/src/main/resources/static', // Đặt thư mục output build
        assetsDir: '', // Đặt assetsDir nếu bạn muốn tổ chức các tài nguyên
        rollupOptions: {
            output: {
                // Tùy chỉnh các tùy chọn rollup nếu cần thiết
            }
        }
    }
});
