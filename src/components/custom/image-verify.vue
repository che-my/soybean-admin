<template>
  <canvas ref="domRef" :width="width" :height="height" class="cursor-pointer" @click="getImgCode"></canvas>
</template>

<script setup lang="ts">
import { watch } from 'vue';
import { useImageVerify } from '@/hooks';

defineOptions({ name: 'ImageVerify' });

interface Props {
  code?: string;
  width?: number | string;
  height?: number | string;
}

const props = withDefaults(defineProps<Props>(), {
  code: '',
  width: 152,
  height: 40
});

interface Emits {
  (e: 'update:code', code: string): void;
}

const emit = defineEmits<Emits>();

const { domRef, imgCode, setImgCode, getImgCode } = useImageVerify();

watch(
  () => props.code,
  newValue => {
    setImgCode(newValue);
  }
);
watch(imgCode, newValue => {
  emit('update:code', newValue);
});

defineExpose({ getImgCode });
</script>

<style scoped></style>
