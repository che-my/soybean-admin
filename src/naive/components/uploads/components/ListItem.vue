<template>
  <n-image-group ref="imageGroupRef" show-toolbar-tooltip>
    <template v-for="file in state.fileList" :key="file.id">
      <list-file :file="file" :upload-key="props.uploadKey" @edit="e => $emit('edit', e)"></list-file>
    </template>
  </n-image-group>
</template>

<script lang="ts" setup>
import type { UploadInject } from '@/naive/types';
import { injectUploadManager } from '@/naive/factory';
import ListFile from './ListFile.vue';
defineOptions({ name: 'ListItem' });
interface Props {
  uploadKey: string;
}
const props = defineProps<Props>();
defineEmits(['edit']);
const state: UploadInject = injectUploadManager(props.uploadKey);
</script>
