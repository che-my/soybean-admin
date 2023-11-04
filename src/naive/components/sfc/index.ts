import { defineAsyncComponent } from 'vue';
export const SfcLocal = defineAsyncComponent(() => import('./sfc-local.vue'));
export const SfcApi = defineAsyncComponent(() => import('./sfc-api.vue'));
