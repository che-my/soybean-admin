import type { App } from 'vue';
import * as Vue from 'vue';
import VueFullscreen from 'vue-fullscreen';
import Tmap from '@map-component/vue-tmap';
import * as lowCodeUtil from '@knxcloud/lowcode-utils';
import './styles/scss/app.scss';

const FastNaive = {
  lowCodeUtil,
  async install(app: App) {
    app.use(VueFullscreen);
    app.use(Tmap);
    const modules = await import('./components');
    Object.keys({ ...modules }).forEach((key: string) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const comp = modules[key];
      app.component(key, comp);
    });
  }
};

if (typeof window !== 'undefined') {
  window.Vue = Vue;
}

export { FastNaive as default, VueFullscreen, lowCodeUtil };
