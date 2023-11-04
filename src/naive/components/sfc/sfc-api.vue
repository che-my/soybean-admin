<script setup lang="ts">
import { loadApiComponent } from '@/naive/utils';

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
  <div class="sfc-api">
    <component :is="comp" :value="modelValue" v-bind="$attrs">
      <slot></slot>
    </component>
  </div>
</template>

<style lang="scss" scoped>
.sfc-api {
  width: initial;
}
</style>
