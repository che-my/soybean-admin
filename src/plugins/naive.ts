import type { App } from 'vue';
import naive from 'naive-ui';

export default function useNaiveUI(app: App) {
  app.use(naive);
}
