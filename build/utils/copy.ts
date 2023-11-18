import type { Target } from 'vite-plugin-static-copy';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import { BasePath } from './index';
const resolve = (src: string, rename = ''): Target => {
  return {
    src,
    dest: `./${BasePath}/libs`,
    rename
  };
};

const resolveModules = (filePath: string) => {
  return `./node_modules/${filePath}`;
};
const resolvePublic = (filePath: string) => {
  return `./public/${BasePath}/libs/${filePath}`;
};

export default function createCopy() {
  const favicon = {
    src: './public/favicon.svg',
    dest: `./${BasePath}/libs`,
    rename: ''
  };
  const targets: Target[] = [
    resolve(resolveModules('vue/dist/vue.runtime.global.prod.js'), 'vue.min.js'),
    resolve(resolveModules('vue-demi/lib/index.iife.js'), 'vue-demi.min.js'),
    resolve(resolveModules('naive-ui/dist/index.prod.js'), 'naive-ui.min.js'),
    resolve(resolvePublic('tinymce/*'), 'tinymce'),
    favicon
  ];
  return viteStaticCopy({ targets });
}
