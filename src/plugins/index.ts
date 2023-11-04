import type { App } from 'vue';
import { setupStore } from '@/store';
import { setupI18n } from '@/locales';
import { setupDirectives } from '@/directives';
import setupAssets from './assets';
import useNaiveUI from './naive';

export function usePlugins(app: App) {
  setupStore(app);
  setupDirectives(app);
  setupI18n(app);
  useNaiveUI(app);
}

export { setupAssets };
