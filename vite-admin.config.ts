import { defineConfig, loadEnv } from 'vite';
import { getServiceEnvConfig } from './.env-config';
import {
  createViteProxy,
  getRootPath,
  getSrcPath,
  setupAdminPlugins,
  viteDefine,
  rollupOptions,
  BasePath
} from './build';

export default defineConfig(configEnv => {
  const viteEnv = loadEnv(configEnv.mode, process.cwd()) as unknown as ImportMetaEnv;

  const rootPath = getRootPath();
  const srcPath = getSrcPath();

  const isOpenProxy = viteEnv.VITE_HTTP_PROXY === 'Y';
  const envConfig = getServiceEnvConfig(viteEnv);

  return {
    base: viteEnv.VITE_BASE_URL,
    resolve: {
      alias: {
        '~': rootPath,
        '@': srcPath,
        'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js',
        vue: 'vue/dist/vue.esm-bundler.js'
      }
    },
    define: viteDefine,
    plugins: setupAdminPlugins(viteEnv),
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "./src/styles/scss/global.scss" as *;`
        }
      }
    },
    server: {
      host: '0.0.0.0',
      port: 3200,
      open: true,
      proxy: createViteProxy(isOpenProxy, envConfig)
    },
    optimizeDeps: {
      include: ['@better-scroll/core', 'echarts', 'swiper', 'swiper/vue', 'vditor', 'xgplayer']
    },
    build: {
      manifest: 'manifest-assets.json',
      assetsDir: `./${BasePath}/assets`,
      reportCompressedSize: false,
      sourcemap: viteEnv.VITE_SERVICE_ENV === 'prod',
      commonjsOptions: {
        ignoreTryCatch: false
      },
      rollupOptions
    }
  };
});
