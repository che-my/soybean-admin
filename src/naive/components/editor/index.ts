import { defineAsyncComponent } from 'vue';
export const Editor = defineAsyncComponent(() => import('./editor.vue'));
export const Markdown = defineAsyncComponent(() => import('./markdown.vue'));
