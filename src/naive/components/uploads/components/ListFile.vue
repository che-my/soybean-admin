<template>
  <div
    class="list-item shadow-lg rounded-md"
    :class="{ 'file-selected': file.selected }"
    :style="{ '--primary-color': primaryColor, '--bg-color': themeVars.bodyColor }"
    @click.stop="state.onSelect(file)"
    @dblclick.stop="state.onDblSelect(file)"
  >
    <div class="w-full" style="position: relative">
      <div class="file-item">
        <n-image
          v-if="file.aggregate_type === 'image'"
          ref="imageRef"
          width="120"
          height="120"
          :preview-disabled="disabled && state.mode !== 0"
          :src="file.url"
        />
        <n-icon v-if="file.aggregate_type === 'document'" :size="54">
          <svg-icon :icon="showIcons(file)"></svg-icon>
        </n-icon>
      </div>
      <div class="file-title">
        <n-ellipsis class="text-items" :line-clamp="2">
          {{ file.basename }}
        </n-ellipsis>
      </div>
      <file-action
        :basename="file.basename"
        :download-url="downloadUrl"
        :mode="state.mode"
        @preview="onPreview"
        @delete="onDelete"
        @edit="onEdit"
      ></file-action>
    </div>
    <n-icon v-if="file.selected" class="file-selected-icon" size="80" :color="primaryColor">
      <svg-icon icon="icon-park-outline:success"></svg-icon>
    </n-icon>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, reactive, ref, unref } from 'vue';
import { useDialog, useThemeVars } from 'naive-ui';
import type { ImageInst } from 'naive-ui/es/image/src/Image';
import type { UploadFieldProp, UploadInject } from '@/naive/types';
import { injectUploadManager } from '@/naive/factory';
import FileAction from './FileAction.vue';

defineOptions({ name: 'ListFile' });
interface Props {
  file: UploadFieldProp;
  uploadKey: string;
}
const props = defineProps<Props>();
const emit = defineEmits(['edit']);
const file: UploadFieldProp = reactive(props.file);
const imageRef = ref<ImageInst>();
const disabled = ref(true);
const themeVars = useThemeVars();
const primaryColor = computed(() => themeVars.value.primaryColor);
const state: UploadInject = injectUploadManager(props.uploadKey);
const downloadUrl = computed(() => `${state.apis.downloadUrl}?file=${file.path}&disk=${file.disk}`);
const onPreview = () => {
  disabled.value = !unref(disabled);
  nextTick(() => {
    unref(imageRef)?.click();
    disabled.value = !unref(disabled);
  });
};
const dialog = useDialog();
const onDelete = () => {
  dialog.error({
    title: `删除此图片【${file.basename}】`,
    content: '是否确认删除此图片吗?',
    negativeText: '取消',
    positiveText: '确认',
    onPositiveClick: () => {
      state.onDelete(file);
    }
  });
};
const onEdit = () => {
  console.log(themeVars);
  emit('edit', file);
};
const IconsList: any = {
  music: 'bi:file-earmark-music',
  video: 'bi:file-earmark-play',
  word: 'bi:file-earmark-word',
  image: 'bi:file-image',
  zip: 'bi:file-earmark-zip-fill',
  pdf: 'bi:file-earmark-pdf',
  xls: 'bi:filetype-xls',
  xlsx: 'bi:filetype-xlsx',
  ppt: 'bi:filetype-ppt',
  pptx: 'bi:filetype-pptx',
  json: 'bi:filetype-json',
  txt: 'bi:filetype-txt',
  svg: 'bi:filetype-svg',
  other: 'bi:file-earmark-text'
};
const images = ['jpg', 'jpeg', 'png', 'bmp', 'gif'];
const videos = ['mp4', 'flv', 'swf', 'avi', 'wmv', 'mpg', 'mpeg', 'mov', 'rm', 'ram'];
const musics = ['mp3', 'wav', 'midi', 'cda', 'wma'];
const files = ['xls', 'xlsx', 'ppt', 'pptx', 'json', 'txt', 'svg', 'pdf'];
const zips = ['zip', 'gz', 'rar', '7z'];
const words = ['doc', 'docx'];

const showIcons = (item: any) => {
  if (images.includes(item.extension)) {
    return IconsList.image;
  } else if (videos.includes(item.extension)) {
    return IconsList.music;
  } else if (musics.includes(item.extension)) {
    return IconsList.video;
  } else if (zips.includes(item.extension)) {
    return IconsList.zip;
  } else if (words.includes(item.extension)) {
    return IconsList.word;
  } else if (files.includes(item.extension)) {
    return IconsList[item.extension];
  }
  return IconsList.other;
};
</script>

<style scoped lang="scss">
.list-item {
  width: 150px;
  height: 185px;
  border-radius: 10px;
  position: relative;
  display: flex;
  box-sizing: border-box;
  cursor: pointer;
  text-align: center;
  margin: 5px;
  background: var(--bg-color);
}
:deep(.text-items) {
  max-width: 130px;
  font-size: 13px;
  font-weight: bold;
  text-align: center;
  margin: 2px 5px;
}
.file-title {
  width: 100%;
  padding: 0 5px;
  height: 48px;
}
.file-item {
  padding: 12px;
  position: relative;
  cursor: pointer;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
}
.file-selected {
  border: 5px solid var(--primary-color);
  height: 195px;
}
.file-selected-icon {
  width: 100%;
  height: 100%;
  position: absolute;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
