<template>
  <n-image-group ref="imageGroupRef" :theme-overrides="imageGroupThemeOverrides" show-toolbar-tooltip>
    <template v-for="file in state.fileList" :key="file.id">
      <list-file :file="file" :upload-key="props.uploadKey" @edit="e => $emit('edit', e)"></list-file>
    </template>
  </n-image-group>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import type { GlobalThemeOverrides } from 'naive-ui';
import { useThemeVars } from 'naive-ui';
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
const imageGroupThemeOverrides = computed(() => {
  const { popoverColor, boxShadow2, textColor2, borderRadius } = useThemeVars().value;
  const themeOverrides: NonNullable<GlobalThemeOverrides['Image']> = {
    toolbarColor: popoverColor,
    toolbarBoxShadow: boxShadow2,
    toolbarIconColor: textColor2,
    toolbarBorderRadius: borderRadius
  };
  return themeOverrides;
});
</script>
