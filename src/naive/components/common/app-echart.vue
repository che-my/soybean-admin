<script setup lang="ts">
import { computed, useAttrs } from 'vue';
import type * as echarts from 'echarts/core';
import { type ECOption, useEcharts } from '@/composables/echarts';
defineOptions({
  name: 'AppEchart',
  inheritAttrs: false
});

interface Props {
  options?: ECOption;
  render?: (chartInstance: echarts.ECharts) => void;
}

const props = withDefaults(defineProps<Props>(), {
  options: undefined,
  render: undefined
});

const values = computed<ECOption>(() => props.options as ECOption);

const { chart, domRef, resize, destroy } = useEcharts(values, props.render);

const attrs = useAttrs();

defineExpose({
  chart,
  domRef,
  resize,
  destroy
});
</script>

<template>
  <div ref="domRef" v-bind="attrs"></div>
</template>
