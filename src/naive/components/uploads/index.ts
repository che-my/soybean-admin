import { defineAsyncComponent } from 'vue';

export const UploadManager = defineAsyncComponent(() => import('./upload-manager.vue'));
export const UploadDragger = defineAsyncComponent(() => import('./upload-dragger.vue'));
export const UploadFile = defineAsyncComponent(() => import('./upload-file.vue'));
export const UploadImage = defineAsyncComponent(() => import('./upload-image.vue'));
