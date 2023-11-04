<template>
  <div class="file-manager flex flex-row" :style="{ minHeight: height }">
    <category-list v-if="!isMobile" v-model="state.type_id" :apis="apis" @change="state.getFileList"></category-list>
    <div class="flex-1 flex flex-col">
      <n-card class="file-manager-top" content-style="padding:10px;" :bordered="false">
        <n-space justify="space-between">
          <n-space>
            <template v-for="item in state.diskList">
              <n-tag :checked="item.checked" checkable @update:checked="(e: boolean) => state.updateChecked(e, item)">
                <template #icon>
                  <svg-icon :icon="item.icon ? item.icon : 'fluent-emoji:floppy-disk'"></svg-icon>
                </template>
                {{ item.name }}
              </n-tag>
            </template>
          </n-space>
          <n-space :size="4">
            <n-input v-model:value="state.filename" placeholder="输入文件名称搜索" @blur="state.getFileList"></n-input>
            <upload-driver
              :action="apis.uploadUrl"
              :multiple="multiple"
              :show-file-list="false"
              :data="state.data"
              v-bind="uploadProps"
              @success="state.uploadSuccess"
            >
              <n-button type="primary">
                <template #icon>
                  <svg-icon icon="mdi:upload"></svg-icon>
                </template>
                上传
              </n-button>
            </upload-driver>
          </n-space>
        </n-space>
      </n-card>
      <list-breadcrumb
        v-if="props.showBreadcrumb"
        :list="state.directorys"
        :name="state.activeDisk.name"
        @change="state.onClickDir"
        @back="state.onBack"
      ></list-breadcrumb>
      <n-card
        class="file-manager-body flex-1 basis-4"
        :bordered="false"
        embedded
        :content-style="{ padding: '10px 10px 52px' }"
        :footer-style="{ padding: 0 }"
      >
        <n-spin class="wh-full" :show="state.loading" description="加载中">
          <n-scrollbar class="manager-scoll">
            <div v-if="state.fileList.length || state.directoryList.length" class="flex items-center flex-wrap">
              <!--              <list-directory v-if="mode === 0" :list="state.directoryList" @change="state.onClickDir"></list-directory>-->
              <list-item :key="state.key" :upload-key="state.uploadKey" @edit="onEdit"></list-item>
            </div>
            <n-empty v-else class="py-64" description="暂无资源"></n-empty>
          </n-scrollbar>
        </n-spin>
        <template #footer>
          <div class="manager-page flex flex-wrap px-3 pt-1">
            <n-pagination
              v-model:page="state.page"
              v-model:page-size="state.pageSize"
              class="py-2"
              show-quick-jumper
              show-size-picker
              :page-count="state.pageCount"
              :page-sizes="[18, 20, 30, 40, 50, 100]"
              @update:page="state.onUpdatePage"
              @update:page-size="state.onUpdatePageSize"
            />
            <div class="flex-grow py-2">
              <n-space class="w-full" justify="space-between">
                <div class="px-2">
                  <span>
                    总共:
                    <n-gradient-text type="info" :size="18">{{ state.total }}</n-gradient-text>
                    条
                  </span>
                </div>
                <n-button v-if="mode > 0" type="primary" @click="state.onConfirm">选择</n-button>
              </n-space>
            </div>
          </div>
        </template>
      </n-card>
    </div>
    <image-cropper v-model:show="showCropper" v-model:value="form.url" :file="form"></image-cropper>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';
import { computed, ref } from 'vue';
import type { UploadProps } from 'naive-ui';
import { useBasicLayout } from '@/composables';
import { isNumber } from '@/utils';
import type { UrlsProps, DisksProps } from '@/naive/types';
import { useUploadManager, defaultApis } from '@/naive/factory';
import { $event } from '@/naive/utils';
import CategoryList from './components/CategoryList.vue';
import UploadDriver from './components/UploadDriver.vue';
import ListBreadcrumb from './components/ListBreadcrumb.vue';
// import ListDirectory from './components/ListDirectory.vue';
import ListItem from './components/ListItem.vue';
import ImageCropper from './components/ImageCropper.vue';

defineOptions({ name: 'UploadManager' });

const props = defineProps({
  multiple: { type: Boolean, default: false },
  apis: {
    type: Object as PropType<UrlsProps>,
    default: () => {
      return defaultApis;
    }
  },
  disks: { type: Object as PropType<DisksProps[]>, default: undefined },
  uploadProps: { type: Object as PropType<UploadProps>, default: undefined },
  modalValue: { type: String, default: '' },
  showBreadcrumb: { type: Boolean, default: true },
  maxCount: { type: Number, default: 1 },
  width: { type: String, default: '' },
  height: { type: [String, Number], default: '' },
  modalKey: { type: String, default: '' },
  mode: {
    type: Number,
    default: 0 // 0=不选,1=单选,2=多选
  }
});
const emit = defineEmits(['update:modalValue', 'select']);
const state = useUploadManager(props, emit);
const { isMobile } = useBasicLayout();
const height = computed(() => {
  if (isNumber(props.height)) {
    return `${props.height}px`;
  }
  return props.height;
});
const showCropper = ref(false);
const form = ref<any>({});
const onEdit = (file: any) => {
  form.value = file;
  showCropper.value = true;
  console.log(file, $event);
};

defineExpose(state);
</script>

<style lang="scss" scoped>
.file-manager {
  box-sizing: border-box;
  width: 100%;
  border: 1px solid rgba(203, 203, 203, 0.6);
  border-radius: 0px;
  .file-manager-top {
    border-bottom: 1px solid rgba(203, 203, 203, 0.6);
    border-left: 1px solid rgba(203, 203, 203, 0.6);
    border-radius: 0;
  }
  .file-manager-body {
    border-left: 1px solid rgba(203, 203, 203, 0.6);
    border-top: 1px solid rgba(203, 203, 203, 0.6);
    border-radius: 0;
    //background: #f4f4f4;
  }
  .manager-scoll {
    width: 100%;
    height: 100%;
    position: relative;
  }

  .manager-page {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 15px 20px 10px;
    height: 60px;
  }

  :deep(.n-tag--checked .n-tag__icon) {
    color: var(--n-text-color-checked);
  }
  :deep(.n-breadcrumb-item__separator) {
    margin: 0 0 0 4px;
  }
  :deep(.n-spin-content) {
    width: 100%;
    height: 100%;
  }
}
</style>
