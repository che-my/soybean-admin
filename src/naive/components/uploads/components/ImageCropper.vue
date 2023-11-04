<script lang="ts" setup>
import 'vue-cropper/dist/index.css';
import { onMounted, ref } from 'vue';
import { VueCropper } from 'vue-cropper';
import { AppModal } from '../../common';
interface Props {
  aspectRatio?: number;
  value?: string;
  show?: boolean;
  file?: any;
}
withDefaults(defineProps<Props>(), {
  aspectRatio: 16 / 9,
  value: '',
  show: false,
  file: null
});

const modelShow = defineModel('show');
const modelValue = defineModel('value');
const fixed = ref<boolean>(false);
const cropperRef = ref<any>();
const options = ref<any>({
  outputSize: 1,
  outputType: 'png',
  full: false,
  canMove: true,
  fixedBox: false,
  original: false,
  canMoveBox: true,
  autoCrop: true,
  // 只有自动截图开启 宽度高度才生效
  autoCropWidth: 750,
  autoCropHeight: 340,
  centerBox: true,
  high: true,
  max: 99999
});
const clearCrop = () => {
  cropperRef.value?.clearCrop();
};
const onImgLoad = () => {
  console.log(cropperRef.value);
};
onMounted(() => {
  console.log(cropperRef.value);
});
</script>
<template>
  <app-modal v-model:show="modelShow" title="图片剪裁" width="800px" :fullscreen="false">
    <div class="flex w-full h-500px">
      <div class="w-3/4">
        <vue-cropper ref="cropperRef" :img="modelValue" :fixed="fixed" v-bind="options" @load="onImgLoad"></vue-cropper>
      </div>
      <div class="w-1/4 px-2">
        <n-space vertical>
          <n-form-item label="裁剪宽度" label-placement="top">
            <n-input-number v-model:value="options.autoCropWidth"></n-input-number>
          </n-form-item>
          <n-form-item label="裁剪高度" label-placement="top">
            <n-input-number v-model:value="options.autoCropHeight"></n-input-number>
          </n-form-item>
        </n-space>
      </div>
    </div>
    <template #action>
      <n-space>
        <n-button-group>
          <n-button @click="fixed = !fixed">切换固定比例/不固定比例</n-button>
          <n-button @click="clearCrop">清除</n-button>
          <n-button>预览</n-button>
          <n-button>裁剪</n-button>
        </n-button-group>
      </n-space>
    </template>
  </app-modal>
</template>
<style scoped></style>
