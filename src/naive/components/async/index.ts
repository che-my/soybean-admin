import { defineAsyncComponent } from 'vue';
// JsonEditorVue
export const VueJsonView = defineAsyncComponent(() => import('@matpool/vue-json-view'));
export const VueDraggable = defineAsyncComponent(() => import('vuedraggable'));
export const JsonEditorVue = defineAsyncComponent(() => import('json-editor-vue'));
