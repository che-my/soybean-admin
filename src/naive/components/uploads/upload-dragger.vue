<template>
  <upload-driver
    :directory-dnd="true"
    :action="uploadUrl"
    :data="params"
    :multiple="multiple"
    :show-file-list="false"
    v-bind="attrs"
  >
    <n-upload-dragger>
      <div class="upload-dragger">
        <div v-if="images.length === 0" style="margin-bottom: 12px">
          <div>
            <n-icon size="48" :depth="3">
              <svg-icon icon="mdi:archive-outline"></svg-icon>
            </n-icon>
          </div>
          <div>
            <n-text style="font-size: 16px">点击或者拖动文件到该区域来上传</n-text>
            <n-p depth="3" style="margin: 8px 0 0 0">请不要上传敏感数据</n-p>
          </div>
        </div>
        <n-image-group v-else show-toolbar-tooltip>
          <template v-for="image in images">
            <n-image
              ref="imageRef"
              :src="image"
              :alt="image"
              :preview-disabled="disabled"
              width="120"
              height="100"
              @click.stop="onPreview"
            ></n-image>
          </template>
        </n-image-group>
        <div class="my-2">
          <slot></slot>
          <app-action v-if="showSelect" class="py-2" type="primary" :event-key="modalKey">
            <template #icon>
              <svg-icon icon="ant-design:cloud-upload-outlined"></svg-icon>
            </template>
            选择文件
          </app-action>
          <app-modal v-if="showSelect" :modal-key="modalKey" title="文件管理" width="1185">
            <upload-manager :height="780" :modal-key="modalKey" :mode="1" @select="onSelect"></upload-manager>
          </app-modal>
        </div>
        <div v-if="images.length > 0" class="close-icon" @click.stop="onClose">
          <n-icon size="24" color="red"><svg-icon icon="mdi:close-circle-outline"></svg-icon></n-icon>
        </div>
      </div>
    </n-upload-dragger>
  </upload-driver>
</template>

<script lang="ts" setup>
import { computed, nextTick, ref, unref, useAttrs } from 'vue';
import type { ImageInst } from 'naive-ui/es/image/src/Image';
import { uuid } from '@/naive/utils';
import { AppModal, AppAction } from '../common';
import UploadDriver from './components/UploadDriver.vue';
import UploadManager from './upload-manager.vue';

defineOptions({ name: 'UploadDragger', inheritAttrs: false });

interface Props {
  uploadUrl?: string;
  disk?: string;
  directory?: string;
  typeId?: string | number;
  field?: string;
  multiple?: boolean;
  showSelect?: boolean;
  modalValue?: Array<string> | string;
  apiPrefix?: string;
}
const props = withDefaults(defineProps<Props>(), {
  uploadUrl: '/fileManager/upload',
  disk: 'public',
  directory: '',
  typeId: 0,
  field: 'file',
  multiple: false,
  showSelect: true,
  modalValue: '',
  apiPrefix: 'http://laravel.org/storage/'
});
const emit = defineEmits(['update:modalValue']);
const modalKey = `showModal_${uuid(12)}`;
const images = ref<string[]>([]);
const imageRef = ref<ImageInst[]>();
const disabled = ref(true);
const params = computed<any>(() => {
  return {
    type_id: props.typeId,
    disk: props.disk,
    multiple: props.multiple ? 1 : 0,
    directory: props.directory,
    upload_field: props.field
  };
});
const attrs = useAttrs();
const onSelect = (selects: string[]) => {
  images.value = selects?.map((select: string) => {
    return props.apiPrefix + select;
  });
  emit('update:modalValue', selects.length > 0 ? selects[0] : '');
};
const onPreview = () => {
  disabled.value = !unref(disabled);
  nextTick(() => {
    unref(imageRef)?.[0]?.click();
    disabled.value = !unref(disabled);
  });
};
const onClose = () => {
  images.value = [];
  emit('update:modalValue', '');
};
</script>

<style lang="scss" scoped>
.upload-dragger {
  position: relative;
  .close-icon {
    position: absolute;
    right: -18px;
    top: -18px;
  }
}
</style>
