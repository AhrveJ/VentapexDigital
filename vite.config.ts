import { fileURLToPath, URL } from 'node:url';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { pythonApi } from './scripts/python-api';

export default defineConfig(({ mode }) => {
  // Local development only: the port the Python contact API listens on. Not used on Bluehost.
  const apiPort = loadEnv(mode, process.cwd(), '').DEV_API_PORT || '5001';

  return {
    plugins: [react(), pythonApi(apiPort)],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      proxy: {
        // changeOrigin: false keeps the browser's Host header, so the API can tell the request comes from this site
        '/api/contact': { target: `http://127.0.0.1:${apiPort}`, changeOrigin: false },
      },
    },
  };
});
