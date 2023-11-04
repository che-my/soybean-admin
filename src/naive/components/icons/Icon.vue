<template>
  <n-icon v-bind="$attrs">
    <SvgIcon v-bind="props"></SvgIcon>
  </n-icon>
</template>

<script lang="ts" setup>
import SvgIcon from '@/components/custom/svg-icon.vue';
defineOptions({
  name: 'AppIcon',
  inheritAttrs: false
});
/**
 * 图标组件
 * - 支持iconify和本地svg图标
 * - 同时传递了icon和localIcon，localIcon会优先渲染
 */
interface Props {
  /** 图标名称 */
  icon?: string;
  /** 本地svg的文件名 */
  localIcon?: string;
}

const props = defineProps<Props>();
// defineEmits(['update:name'])
</script>

<style scoped></style>
