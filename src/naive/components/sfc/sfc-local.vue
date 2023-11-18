<script setup lang="ts">
import { loadSfcComponent } from '@/naive/utils/vue-sfc-loader';

defineOptions({
  name: 'SfcLocal',
  inheritAttrs: false
});

interface Props {
  path: string;
  tpl: string;
}

const props = defineProps<Props>();
const modelValue = defineModel('value');
const comp = loadSfcComponent(props);
</script>

<template>
  <component :is="comp" class="sfc-local" :value="modelValue" v-bind="$attrs">
    <slot></slot>
  </component>
</template>
