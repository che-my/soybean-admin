import { defineAsyncComponent } from 'vue';

// @ts-ignore
export const AsyncErrorPage = defineAsyncComponent(() => import('../components/errors/ErrorIframe.vue'));

// @ts-ignore
export const AsyncVueRender = defineAsyncComponent(() => import('../components/render/vue-render.vue'));
