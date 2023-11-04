<script setup lang="ts">
import { loadSfcComponent } from '@/naive/utils';

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
  <div class="sfc-local">
    <component :is="comp" :value="modelValue" v-bind="$attrs">
      <slot></slot>
    </component>
  </div>
</template>

<style lang="scss" scoped>
.sfc-local {
  width: initial;
}
</style>
