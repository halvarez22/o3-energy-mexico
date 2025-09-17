import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Configuración para cargar archivos .cjs
process.env.VITE_TAILWIND_CONFIG = path.resolve(__dirname, 'tailwind.config.cjs');
process.env.VITE_POSTCSS_CONFIG = path.resolve(__dirname, 'postcss.config.cjs');

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    define: {
      'process.env': {
        GEMINI_API_KEY: JSON.stringify(env.GEMINI_API_KEY || ''),
        NODE_ENV: JSON.stringify(mode)
      }
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '~': path.resolve(__dirname)
      }
    },
    plugins: [
      react({
        jsxImportSource: '@emotion/react',
        babel: {
          plugins: ['@emotion/babel-plugin']
        }
      }),
      tsconfigPaths()
    ],
    server: {
      port: 3000,
      open: true,
      strictPort: true,
      host: true,
      hmr: {
        overlay: false
      }
    },
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: false,
      minify: 'esbuild',
      target: 'es2015',
      rollupOptions: {
        output: {
          manualChunks: {
            react: ['react', 'react-dom', 'react-router-dom'],
            vendor: ['@emotion/react']
          }
        },

      }
    },
    optimizeDeps: {
      include: ['react', 'react-dom'],
      esbuildOptions: {
        // Node.js global to browser globalThis
        define: {
          global: 'globalThis'
        }
      }
    },
    css: {
      modules: {
        localsConvention: 'camelCaseOnly'
      },
      // Habilitar sourcemaps para CSS en desarrollo
      devSourcemap: mode !== 'production'
    }
  };
});
