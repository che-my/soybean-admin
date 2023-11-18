<script setup lang="ts">
import { loadApiComponent } from '@/naive/utils/vue-sfc-loader';

defineOptions({
  name: 'SfcApi',
  inheritAttrs: false
});

interface Props {
  api: string;
}

const props = defineProps<Props>();
const modelValue = defineModel('value');
const comp = loadApiComponent(props.api);
</script>

<template>
  <component :is="comp" class="sfc-api" :value="modelValue" v-bind="$attrs">
    <slot></slot>
  </component>
</template>
