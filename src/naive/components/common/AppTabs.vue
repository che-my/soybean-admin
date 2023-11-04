<template>
  <n-tabs v-bind="attrs">
    <template v-for="option in props.options">
      <n-tab-pane v-bind="option">
        <template #tab><slot :name="slotTabName(option.name)"></slot></template>
        <slot :name="slotName(option.name)"></slot>
      </n-tab-pane>
    </template>
    <template #prefix><slot name="prefix"></slot></template>
    <template #suffix><slot name="suffix"></slot></template>
  </n-tabs>
</template>

<script lang="ts" setup>
import { useAttrs } from 'vue';
import type { PropType } from 'vue';
import { NTabs, NTabPane } from 'naive-ui';
defineOptions({
  name: 'AppTabs',
  inheritAttrs: false
});
const props = defineProps({
  options: {
    type: Array as PropType<any>,
    default: () => []
  }
});
const attrs = useAttrs();
const slotTabName = (index: any) => {
  return `tab_${index}`;
};
const slotName = (index: any) => {
  return `slot_${index}`;
};
</script>
