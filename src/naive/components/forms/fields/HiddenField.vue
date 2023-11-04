<script setup lang="ts">
import type { Ref } from 'vue';
import { watch } from 'vue';

defineOptions({
  name: 'RadioField',
  inheritAttrs: false
});

interface Props {
  defaultValue?: any;
}

withDefaults(defineProps<Props>(), {
  defaultValue: ''
});
const modelValue: Ref<any> = defineModel('value', {
  default: (props: Props) => props.defaultValue
});
const emit = defineEmits(['change']);
const onUpdateValue = (value: any) => {
  modelValue.value = value;
  emit('change', value);
};
watch(
  () => modelValue.value,
  newVal => onUpdateValue(newVal),
  { deep: true }
);
</script>

<template>
  <div>{{ modelValue }}</div>
</template>
