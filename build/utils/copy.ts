import type { Target } from 'vite-plugin-static-copy';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import { BasePath } from './index';

const resolve = (src: string, destName: string, rename = ''): Target => {
  return {
    src,
    dest: `./${BasePath}/libs/${destName}`,
    rename
  };
};

const resolveModules = (filePath: string) => {
  return `./node_modules/${filePath}`;
};
const resolvePublic = (filePath: string) => {
  return `./public/vendor/admin/libs/${filePath}`;
};

export default function createCopy() {
  const favicon = {
    src: './public/favicon.svg',
    dest: `./${BasePath}/assets`,
    rename: ''
  };
  const targets: Target[] = [
    resolve(resolveModules('vue/dist/vue.runtime.global.prod.js'), 'vue', 'vue.min.js'),
    resolve(resolveModules('vue-demi/lib/index.iife.js'), 'vue-demi', 'vue-demi.js'),
    resolve(resolveModules('echarts/dist/echarts.min.js'), 'echarts'),
    resolve(resolveModules('naive-ui/dist/index.prod.js'), 'naive-ui', 'naive-ui.min.js'),
    resolve(resolveModules('vue3-sfc-loader/dist/vue3-sfc-loader.js*'), 'vue3-sfc-loader'),
    resolve(resolvePublic('tinymce/*'), 'tinymce'),
    favicon
  ];
  return viteStaticCopy({ targets });
}
