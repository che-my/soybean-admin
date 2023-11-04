import type { App as VueApp } from 'vue';
import { createApp } from 'vue';
import * as Vue from 'vue';
import components, { AppLoading } from '@/components';
import FastNaive from '@/naive';
import App from './App.vue';
import { setupRouter } from './router';
import { setupAssets, usePlugins } from './plugins';

setupAssets();

window.Vue = Vue;

export default class SoybeanAdmin {
  protected $app: VueApp;

  constructor(callback?: ADMIN.AppCallback) {
    const appLoading = createApp(AppLoading);
    appLoading.mount('#appLoading');
    this.$app = createApp(App);
    usePlugins(this.$app);
    this.$app.use(components);
    this.$app.use(FastNaive);
    // this.$app.config.errorHandler = (err, instance, info) => {
    //   // console.log('错误', err, instance, info);
    // };
    callback !== undefined && callback(this.$app);
    appLoading.unmount();
  }

  public async render(dom = '#app'): Promise<void> {
    await setupRouter(this.$app);
    this.$app?.mount(dom);
  }
}
