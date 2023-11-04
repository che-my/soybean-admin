import type { PluginOption } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import unocss from '@unocss/vite';
import progress from 'vite-plugin-progress';
import pageRoute from '@soybeanjs/vite-plugin-vue-page-route';
import laravel from 'laravel-vite-plugin';
import manifestSRI from 'vite-plugin-manifest-sri';
import VueDevtools from 'vite-plugin-vue-devtools';
import createCopy from '../utils/copy';
import unplugin from './unplugin';
import visualizer from './visualizer';
import compress from './compress';
import pwa from './pwa';
import createPrismjs from './prismjs';

/**
 * vite插件
 * @param viteEnv - 环境变量配置
 */
export function setupAdminPlugins(viteEnv: ImportMetaEnv): (PluginOption | PluginOption[])[] {
  const plugins: any[] = [
    vue({
      script: {
        defineModel: true
      }
    }),
    vueJsx(),
    VueDevtools(),
    ...unplugin(viteEnv),
    unocss(),
    progress(),
    pageRoute(),
    createPrismjs(),
    createCopy()
  ];

  plugins.push(
    laravel({
      input: 'src/main.ts',
      publicDirectory: 'dist',
      buildDirectory: './'
    })
  );

  plugins.push(manifestSRI());

  if (viteEnv.VITE_VISUALIZER === 'Y') {
    plugins.push(visualizer as PluginOption);
  }
  if (viteEnv.VITE_COMPRESS === 'Y') {
    plugins.push(compress(viteEnv));
  }

  if (viteEnv.VITE_PWA === 'Y' || viteEnv.VITE_VERCEL === 'Y') {
    plugins.push(pwa());
  }

  return plugins;
}
