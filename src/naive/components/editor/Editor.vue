<script setup lang="ts">
import { ref, nextTick, watch, computed, onBeforeUnmount, onMounted, unref } from 'vue';
// @ts-ignore
import Vue3Tinymce from '@jsdawn/vue3-tinymce';
import { useThemeStore } from '@/store';
import { useBoolean } from '@/hooks';
import { localStg } from '@/utils';
import { AppModal } from '../common';
import { UploadManager } from '../uploads';
import config from './config/tinymce';
const modelValue = defineModel<string>('value');
const theme = useThemeStore();
const baseDir = '/vendor/admin/libs/tinymce';
// '/mycontent.css'
const contentCss = computed(() => {
  return `${baseDir}/skins/content/${theme.darkMode ? 'dark' : 'default'}/content.min.css`;
});
const Authorization = localStg.get('token') || '';
const setting = computed(() => ({
  ...config,
  placeholder: '请输入内容',
  height: 300,
  // 以中文简体为例
  language: 'zh-Hans',
  language_url: `${baseDir}/langs/zh-Hans.js`,
  // skin_url: '/tinymce/skins/ui/oxide',
  skin_url: `${baseDir}/skins/ui/oxide${theme.darkMode ? '-dark' : ''}`,
  content_css: unref(contentCss),
  // 开启组件拓展的 上传图片功能，工具栏 图片按钮 弹框中出现 `upload` 选项
  custom_images_upload: true,
  // 复用 图片上传 api 地址
  images_upload_url: '/admin-api/fileManager/upload',
  // 上传成功回调函数，return 图片地址。默认 response.location
  custom_images_upload_callback: (response: any) => response.data.url,
  // 上传 api 请求头
  custom_images_upload_header: { Authorization },
  // 上传 api 额外的参数。图片默认 file
  custom_images_upload_param: { directory: 'tinymce' }
}));
const showFileManager = ref(false);
const editorCore = ref();
const { bool, setBool } = useBoolean(true);
const onInit = (editor: any) => {
  editorCore.value = editor;
};

watch(
  () => theme.darkMode,
  () => {
    editorCore.value?.destroy();
    setBool(false);
    nextTick(() => {
      setBool(true);
    });
  }
);

onBeforeUnmount(() => {
  editorCore.value?.destroy();
});
const onSetup = (editor: any) => {
  editor.ui.registry.addButton('FileManager', {
    icon: 'browse',
    text: '文件管理',
    title: '文件管理',
    onAction: () => {
      showFileManager.value = true;
    }
    // onAction: _ => editor.execCommand('TestButton') // 执行命令
  });
};
onMounted(() => {});
const onSelectFile = ({ items }: { items: any[] }) => {
  items?.forEach((item: any) => {
    editorCore.value?.execCommand(
      'mceInsertContent',
      false,
      `<img src="${item.url}" style="width: 375px;height: auto" />`
    );
  });
  showFileManager.value = false;
};
</script>

<template>
  <div class="editor">
    <Vue3Tinymce
      v-if="bool"
      v-model="modelValue"
      :setting="setting"
      :setup="onSetup"
      script-src="/vendor/admin/libs/tinymce/tinymce.min.js"
      @init="onInit"
    ></Vue3Tinymce>
    <app-modal v-model="showFileManager" title="文件管理" :width="1200" :fullscreen="false">
      <upload-manager :mode="1" @select="onSelectFile"></upload-manager>
    </app-modal>
  </div>
</template>

<style lang="scss" scoped></style>
