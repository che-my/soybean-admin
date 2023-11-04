import type { App } from 'vue';

const components: Record<string, any> = import.meta.glob('./**/*.{vue,tsx,jsx}', { eager: true });

export { default as AppLoading } from './common/app-loading.vue';

export default {
  install(app: App) {
    Object.keys({ ...components }).forEach((key: string) => {
      const component = components[key].default;
      app.component(component.name, component);
    });
  }
};
