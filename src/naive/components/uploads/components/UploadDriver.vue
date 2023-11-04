<template>
  <n-upload
    :accept="accept"
    :multiple="multiple"
    :action="action"
    :data="data"
    :headers="headers"
    :max="max"
    :custom-request="options => uploadRequest(options, name)"
    v-bind="attrs"
    @finish="onFinish"
    @error="onError"
  >
    <slot></slot>
  </n-upload>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';
import { useAttrs } from 'vue';
import type { UploadFileInfo } from 'naive-ui';
import { uploadRequest } from '@/naive/hook/uploadHelper';

defineOptions({ name: 'UploadDriver' });

defineProps({
  name: { type: String, default: 'file' },
  accept: { type: String, default: undefined },
  action: { type: String, default: undefined },
  max: { type: Number, default: undefined },
  multiple: { type: Boolean, default: false },
  data: { type: Object as PropType<Record<string, any>>, default: undefined },
  headers: { type: Object as PropType<Record<string, any>>, default: undefined }
});

const emit = defineEmits(['success', 'error']);

const attrs = useAttrs();

const onFinish = (options: { file: UploadFileInfo; event?: ProgressEvent }) => {
  emit('success', options);
};

const onError = (options: { file: UploadFileInfo; event?: ProgressEvent }) => {
  emit('error', options);
};
</script>

<style scoped></style>
